'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ref, set } from 'firebase/database';
import { database } from '@/lib/firebase';
import { generateRoomCode } from '@/lib/roomCode';

export default function CreateRoom() {
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const createRoom = async () => {
    setCreating(true);
    const roomCode = generateRoomCode();
    
    try {
      // Create room in Firebase
      await set(ref(database, `rooms/${roomCode}`), {
        code: roomCode,
        status: 'lobby',
        currentQuestion: 0,
        createdAt: Date.now(),
        players: {}
      });
      
      // Navigate to host view
      router.push(`/host/${roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">🦃</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Turkey Trivia</h2>
        <p className="text-gray-600 mb-8">Showdown</p>
        
        <button
          onClick={createRoom}
          disabled={creating}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors disabled:opacity-50"
        >
          {creating ? 'Creating Room...' : 'Create Game Room'}
        </button>
      </div>
    </div>
  );
}