'use client';

import { useParams } from 'next/navigation';
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

export default function HostRoom() {
  const params = useParams();
  const roomCode = params.roomCode as string;
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

  if (!room) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const players = Object.values(room.players || {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 p-8">
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

        {/* Lobby - Players Waiting */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Players in Lobby</h2>
          
          {players.length === 0 ? (
            <p className="text-gray-500 text-xl text-center py-12">
              Waiting for players to join...
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
            <button className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors">
              Start Game ({players.length} players)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}