'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
import { database } from '@/lib/firebase';
import { QRCodeCanvas } from 'qrcode.react';

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

export default function HostRoom() {
  const params = useParams();
  const roomCode = params.roomCode as string;
  const [room, setRoom] = useState<Room | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showResults, setShowResults] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load room data
  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomCode}`);
    
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoom(data);
        setShowResults(false);
      }
    });

    return () => unsubscribe();
  }, [roomCode]);

  // Load questions
  useEffect(() => {
    const loadQuestions = async () => {
      const questionsRef = ref(database, 'questions');
      const snapshot = await get(questionsRef);
      
      if (snapshot.exists()) {
        const allQuestions: Question[] = Object.values(snapshot.val());
        setQuestions(allQuestions);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Timer countdown and music
  useEffect(() => {
    if (room?.status === 'active' && !showResults && room.questionStartTime) {
      // Start Jeopardy music
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }

      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - room.questionStartTime!) / 1000);
        const remaining = Math.max(15 - elapsed, 0);
        setTimeLeft(remaining);

        if (remaining === 0) {
          // Stop music
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          
          setShowResults(true);
          // Auto-advance after 5 seconds of showing results
          setTimeout(() => {
            nextQuestion();
          }, 5000);
        }
      }, 100);

      return () => {
        clearInterval(interval);
        // Stop music on cleanup
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [room?.status, room?.questionStartTime, showResults]);

  const startGame = async () => {
    if (!questions.length) return;

    // Select 20 random questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 20).map(q => q.id);

    await update(ref(database, `rooms/${roomCode}`), {
      status: 'active',
      currentQuestion: 0,
      selectedQuestions,
      questionStartTime: Date.now()
    });
  };

  const nextQuestion = async () => {
    if (!room) return;
    
    const nextQuestionIndex = room.currentQuestion + 1;
    
    if (nextQuestionIndex >= 20) {
      // Game over
      await update(ref(database, `rooms/${roomCode}`), {
        status: 'finished'
      });
    } else {
      await update(ref(database, `rooms/${roomCode}`), {
        currentQuestion: nextQuestionIndex,
        questionStartTime: Date.now()
      });
      setShowResults(false);
      setTimeLeft(15);
    }
  };

  if (loading || !room) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const players = Object.values(room.players || {});
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Get current question
  const currentQuestion = room.selectedQuestions && room.selectedQuestions[room.currentQuestion]
    ? questions.find(q => q.id === room.selectedQuestions![room.currentQuestion])
    : null;

  // Get players who answered this question
  const playersWhoAnswered = currentQuestion ? players
    .filter(p => p.answers?.[room.currentQuestion])
    .map(p => ({
      ...p,
      answerData: p.answers![room.currentQuestion]
    }))
    : [];

  // Separate correct and incorrect answers
  const correctAnswers = playersWhoAnswered
    .filter(p => p.answerData.correct)
    .sort((a, b) => a.answerData.timestamp - b.answerData.timestamp);

  const wrongAnswers = playersWhoAnswered
    .filter(p => !p.answerData.correct);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 p-8">
      {/* Audio element for Jeopardy music */}
      <audio ref={audioRef} src="/jeopardy.mp3" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Room: {roomCode}</h1>
            <div className="text-2xl font-bold text-orange-600">
              {players.length} Player{players.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Lobby */}
        {room.status === 'lobby' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Join the Game!</h2>
            
            {/* QR Code */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-orange-500">
                <QRCodeCanvas
  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/join?code=${roomCode}`}
  size={200}
  level="H"
/>
              </div>
              <p className="text-gray-600 mt-4 text-center">
                Scan QR code with your phone camera
              </p>
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm mb-2">Or go to:</p>
                <p className="text-orange-600 font-bold text-xl">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/join
                </p>
                <p className="text-gray-600 text-sm mt-2">Room Code:</p>
                <p className="text-5xl font-bold text-orange-600 tracking-wider">{roomCode}</p>
              </div>
            </div>

            {/* Players List */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Players Joined:</h3>
            {players.length === 0 ? (
              <p className="text-gray-500 text-xl text-center py-8">
                Waiting for players to join...
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-orange-100 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl mb-2">👤</div>
                    <div className="font-bold text-gray-800">{player.name}</div>
                  </div>
                ))}
              </div>
            )}

            {players.length > 0 && (
              <button 
                onClick={startGame}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors"
              >
                Start Game ({players.length} players)
              </button>
            )}
          </div>
        )}

        {/* Active Game - Question Display */}
        {room.status === 'active' && currentQuestion && !showResults && (
          <div>
            {/* Timer */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-800">
                  Time Remaining:
                </div>
                <div className={`text-6xl font-bold ${
                  timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-orange-600'
                }`}>
                  {timeLeft}s
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    timeLeft <= 5 ? 'bg-red-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-orange-600 font-bold text-xl mb-2">
                  Question {room.currentQuestion + 1} of 20
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                  {currentQuestion.category}
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
                {Object.entries(currentQuestion.answers).map(([key, value]) => (
                  <div
                    key={key}
                    className={`p-6 rounded-lg text-center font-bold text-xl ${
                      key === 'a' ? 'bg-red-100 text-red-800' :
                      key === 'b' ? 'bg-blue-100 text-blue-800' :
                      key === 'c' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <div className="text-sm mb-2">{key.toUpperCase()}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>

              {/* Who's Answered */}
              <div className="mt-8 text-center">
                <div className="text-gray-600 text-lg">
                  {playersWhoAnswered.length} of {players.length} answered
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results After Question */}
        {room.status === 'active' && currentQuestion && showResults && (
          <div>
            {/* Correct Answer */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Correct Answer: {currentQuestion.correct.toUpperCase()}
                </h3>
                <p className="text-xl text-gray-600">
                  {currentQuestion.answers[currentQuestion.correct]}
                </p>
              </div>

              {/* Correct Answers - Speed Ranking */}
              {correctAnswers.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-2xl font-bold text-green-700 mb-4 text-center">
                    ✅ Correct Answers
                  </h4>
                  <div className="max-w-2xl mx-auto space-y-3">
                    {correctAnswers.map((player, index) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-6 rounded-lg ${
                          index === 0 ? 'bg-green-200 border-2 border-green-400' :
                          index === 1 ? 'bg-green-100' :
                          'bg-green-50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '✓'}
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-800">
                              {index === 0 ? '🏆 Winner: ' : index === 1 ? 'Close second: ' : index === 2 ? 'Third place: ' : ''}
                              {player.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-green-700">
                          +{player.answerData.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wrong Answers */}
              {wrongAnswers.length > 0 && (
                <div>
                  <h4 className="text-xl font-bold text-red-700 mb-3 text-center">
                    ❌ Incorrect
                  </h4>
                  <div className="max-w-2xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {wrongAnswers.map((player) => (
                        <div
                          key={player.id}
                          className="bg-red-50 text-red-800 px-4 py-2 rounded-lg font-semibold"
                        >
                          {player.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Overall Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Standings</h3>
              <div className="space-y-2">
                {sortedPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex justify-between items-center p-4 rounded-lg ${
                      index === 0 ? 'bg-yellow-100' :
                      index === 1 ? 'bg-gray-100' :
                      index === 2 ? 'bg-orange-100' :
                      'bg-white border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-600">#{index + 1}</div>
                      <div className="font-bold text-gray-800">{player.name}</div>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">{player.score}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={nextQuestion}
                className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors"
              >
                {room.currentQuestion >= 19 ? 'Show Final Results' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}

        {/* Game Finished */}
        {room.status === 'finished' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">🎉 Game Over! 🎉</h2>
            <div className="text-6xl mb-6">🏆</div>
            
            <h3 className="text-3xl font-bold text-orange-600 mb-8">
              Winner: {sortedPlayers[0]?.name}
            </h3>

            <div className="space-y-3 max-w-md mx-auto mb-8">
              {sortedPlayers.slice(0, 5).map((player, index) => (
                <div
                  key={player.id}
                  className={`flex justify-between items-center p-4 rounded-lg ${
                    index === 0 ? 'bg-yellow-200 text-yellow-900' :
                    index === 1 ? 'bg-gray-200 text-gray-900' :
                    index === 2 ? 'bg-orange-200 text-orange-900' :
                    'bg-blue-100 text-blue-900'
                  }`}
                >
                  <div className="font-bold">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    {' '}{player.name}
                  </div>
                  <div className="font-bold">{player.score} pts</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}