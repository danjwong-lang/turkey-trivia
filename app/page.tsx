'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '@/lib/firebase';

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function Home() {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const createRoom = async () => {
    setCreating(true);
    
    try {
      const roomCode = generateRoomCode();
      
      await set(ref(database, `rooms/${roomCode}`), {
        code: roomCode,
        status: 'lobby',
        currentQuestion: 0,
        players: {},
        createdAt: Date.now()
      });

      router.push(`/host/${roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room. Please try again.');
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦃</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Turkey Trivia Showdown
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time multiplayer trivia for family gatherings
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6 border border-orange-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            How to Play:
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Host opens game on laptop</strong>
                  <br />
                  <span className="text-sm">Display on big screen for everyone to see</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Players join on their phones</strong>
                  <br />
                  <span className="text-sm">Scan QR code or enter room code</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <p className="text-gray-700">
                  <strong className="text-gray-900">Compete in real-time!</strong>
                  <br />
                  <span className="text-sm">Answer questions, earn points, win bragging rights</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-100 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">2-15</div>
            <div className="text-sm text-gray-600 font-medium">Players</div>
          </div>
          <div className="bg-red-100 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-600">20</div>
            <div className="text-sm text-gray-600 font-medium">Questions</div>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">20s</div>
            <div className="text-sm text-gray-600 font-medium">Per Question</div>
          </div>
        </div>

        {/* Scoring Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2 text-center">⚡ Speed-Based Scoring</h3>
          <div className="flex justify-center gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-yellow-600">🥇 1st</div>
              <div className="text-gray-600">100 pts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-400">🥈 2nd</div>
              <div className="text-gray-600">25 pts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-orange-600">🥉 3rd</div>
              <div className="text-gray-600">10 pts</div>
            </div>
          </div>
        </div>

        {/* Create Room Button */}
        <button
          onClick={createRoom}
          disabled={creating}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl font-bold py-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {creating ? '🎮 Creating Room...' : '🎮 Create Game Room'}
        </button>

        {/* Footer */}
        <div className="text-center mt-6 space-y-1">
          <p className="text-gray-500 text-sm">
            No app download required • Works on any device
          </p>
          <p className="text-gray-400 text-xs">
            STEM • Sports • Pop Culture • TV • Movies • Thanksgiving
          </p>
        </div>
      </div>
    </div>
  );
}