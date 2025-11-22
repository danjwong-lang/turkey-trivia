'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '@/lib/firebase';

interface Player {
  id: string;
  name: string;
  score: number;
}

interface Room {
  code: string;
  status: string;
  players: Record<string, Player>;
}

export default function PlayRoom() {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomCode = params.roomCode as string;
  const playerId = searchParams.get('playerId');
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const roomRef = ref(database, `rooms/${roomCode}`);
    
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoom(data);
      }
    });

    return () => unsubscribe();
  }, [roomCode]);

  if (!room || !playerId) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentPlayer = room.players[playerId];
  const allPlayers = Object.values(room.players || {}).sort((a, b) => b.score - a.score);
  const playerPosition = allPlayers.findIndex(p => p.id === playerId) + 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 p-4">
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

        {/* Waiting Status */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {room.status === 'lobby' ? (
            <>
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Waiting for game to start...
              </h3>
              <p className="text-gray-600">
                {allPlayers.length} player{allPlayers.length !== 1 ? 's' : ''} in lobby
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Game in progress...
              </h3>
              <p className="text-gray-600">
                Questions will appear here
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}