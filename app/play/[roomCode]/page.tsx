'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { ref, onValue, get, update } from 'firebase/database';
import { database } from '@/lib/firebase';

interface Player {
  id: string;
  name: string;
  score: number;
  answers?: Record<number, { answer: string; correct: boolean; timestamp: number; points: number }>;
}

interface Question {
  id: string;
  category: string;
  text: string;
  answers: { a: string; b: string; c: string; d: string };
  correct: string;
}

interface Room {
  code: string;
  status: string;
  currentQuestion: number;
  players: Record<string, Player>;
  selectedQuestions?: string[];
  questionStartTime?: number;
}

export default function PlayRoom() {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomCode = params.roomCode as string;
  const playerId = searchParams.get('playerId');
  const [room, setRoom] = useState<Room | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const correctSoundRef = useRef<HTMLAudioElement | null>(null);
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomCode}`);
    
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoom(data);
        
        // Check if player has answered current question
        if (playerId && data.players[playerId]?.answers?.[data.currentQuestion]) {
          setHasAnswered(true);
          setSelectedAnswer(data.players[playerId].answers[data.currentQuestion].answer);
        } else {
          setHasAnswered(false);
          setSelectedAnswer(null);
        }
      }
    });

    return () => unsubscribe();
  }, [roomCode, playerId]);

  useEffect(() => {
    const loadQuestions = async () => {
      const questionsRef = ref(database, 'questions');
      const snapshot = await get(questionsRef);
      
      if (snapshot.exists()) {
        const allQuestions: Question[] = Object.values(snapshot.val());
        setQuestions(allQuestions);
      }
    };

    loadQuestions();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (room?.status === 'active' && !hasAnswered && room.questionStartTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - room.questionStartTime!) / 1000);
        const remaining = Math.max(20 - elapsed, 0);
        setTimeLeft(remaining);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [room?.status, room?.questionStartTime, hasAnswered]);

  const submitAnswer = async (answer: string) => {
    if (!room || !playerId || hasAnswered) return;

    const currentQuestion = room.selectedQuestions?.[room.currentQuestion];
    if (!currentQuestion) return;

    const question = questions.find(q => q.id === currentQuestion);
    if (!question) return;

    const isCorrect = answer === question.correct;
    const timestamp = Date.now();

    // Play sound effect
    if (isCorrect && correctSoundRef.current) {
      correctSoundRef.current.play().catch(e => console.log('Sound play failed:', e));
    } else if (!isCorrect && wrongSoundRef.current) {
      wrongSoundRef.current.play().catch(e => console.log('Sound play failed:', e));
    }

    // Calculate points based on speed
let points = 0;
if (isCorrect) {
  const players = Object.values(room.players || {});
  
  // Count how many correct answers were submitted BEFORE this timestamp
  const correctAnswersBefore = players.filter(p => {
    const ans = p.answers?.[room.currentQuestion];
    return ans?.correct && ans.timestamp < timestamp;
  }).length;
  
  // Award points: 1st=100, 2nd=25, 3rd=10, 4th+=0
  if (correctAnswersBefore === 0) points = 100;
  else if (correctAnswersBefore === 1) points = 25;
  else if (correctAnswersBefore === 2) points = 10;
  else points = 0;
}

    // Update player's answer and score
    const playerRef = ref(database, `rooms/${roomCode}/players/${playerId}`);
    const currentPlayer = room.players[playerId];
    
    await update(playerRef, {
      [`answers/${room.currentQuestion}`]: {
        answer,
        correct: isCorrect,
        timestamp,
        points
      },
      score: (currentPlayer?.score || 0) + points
    });

    setSelectedAnswer(answer);
    setHasAnswered(true);
  };

  if (!room || !playerId) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentPlayer = room.players[playerId];
  const allPlayers = Object.values(room.players || {}).sort((a, b) => b.score - a.score);
  const playerPosition = allPlayers.findIndex(p => p.id === playerId) + 1;

  const currentQuestion = room.selectedQuestions && room.selectedQuestions[room.currentQuestion]
    ? questions.find(q => q.id === room.selectedQuestions![room.currentQuestion])
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 p-4">
      {/* Audio elements for sound effects */}
      <audio ref={correctSoundRef} src="/correct.mp3" />
      <audio ref={wrongSoundRef} src="/wrong.mp3" />
      
      <div className="max-w-md mx-auto">
        {/* Player Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentPlayer?.name || 'Player'}
            </h2>
            <div className="text-4xl font-bold text-orange-600">
              {currentPlayer?.score || 0} pts
            </div>
            <div className="text-gray-600 mt-2">
              Position: #{playerPosition} of {allPlayers.length}
            </div>
          </div>
        </div>

        {/* Lobby */}
        {room.status === 'lobby' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Waiting for game to start...
            </h3>
            <p className="text-gray-600">
              {allPlayers.length} player{allPlayers.length !== 1 ? 's' : ''} in lobby
            </p>
          </div>
        )}

        {/* Active Game */}
        {room.status === 'active' && currentQuestion && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Countdown Timer on Player Phone */}
            {!hasAnswered && (
              <div className="mb-6">
                <div className="text-center mb-2">
                  <div className={`text-5xl font-bold ${
                    timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-orange-600'
                  }`}>
                    {timeLeft}s
                  </div>
                  <div className="text-gray-600 text-sm">Time Remaining</div>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      timeLeft <= 5 ? 'bg-red-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${(timeLeft / 20) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="text-orange-600 font-bold mb-2">
                Question {room.currentQuestion + 1} of 20
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {currentQuestion.text}
              </h3>
            </div>

            {!hasAnswered ? (
              <div className="space-y-3">
                {Object.entries(currentQuestion.answers).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => submitAnswer(key)}
                    className={`w-full p-6 rounded-xl font-bold text-xl transition-all transform active:scale-95 ${
                      key === 'a' ? 'bg-red-500 hover:bg-red-600 text-white' :
                      key === 'b' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                      key === 'c' ? 'bg-green-500 hover:bg-green-600 text-white' :
                      'bg-yellow-500 hover:bg-yellow-600 text-white'
                    }`}
                  >
                    <div className="text-sm mb-1">{key.toUpperCase()}</div>
                    <div>{value}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">
                  {selectedAnswer === currentQuestion.correct ? '✅' : '❌'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Wrong!'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedAnswer === currentQuestion.correct 
                    ? `+${currentPlayer.answers?.[room.currentQuestion]?.points || 0} points!`
                    : `Correct answer: ${currentQuestion.correct.toUpperCase()}`
                  }
                </p>
                <p className="text-gray-500">
                  Waiting for next question...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Game Finished */}
        {room.status === 'finished' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Over!</h2>
            
            {playerPosition === 1 && (
              <>
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-3xl font-bold text-orange-600 mb-4">
                  You Won!
                </h3>
              </>
            )}
            
            {playerPosition === 2 && (
              <>
                <div className="text-6xl mb-4">🥈</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4">
                  2nd Place!
                </h3>
              </>
            )}
            
            {playerPosition === 3 && (
              <>
                <div className="text-6xl mb-4">🥉</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4">
                  3rd Place!
                </h3>
              </>
            )}
            
            {playerPosition > 3 && (
              <>
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-4">
                  #{playerPosition}
                </h3>
              </>
            )}

            <div className="text-4xl font-bold text-orange-600 mb-6">
              {currentPlayer?.score || 0} points
            </div>

            <p className="text-gray-600">
              Great game! Ask the host to start a new round.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}