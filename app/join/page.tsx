'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ref, get, set } from 'firebase/database';
import { database } from '@/lib/firebase';

const MAX_PLAYERS = 15;

export default function JoinRoom() {
  const searchParams = useSearchParams();
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);
  const router = useRouter();

  // Auto-fill room code if coming from QR code
  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl) {
      setRoomCode(codeFromUrl.toUpperCase());
    }
  }, [searchParams]);

  const joinRoom = async () => {
    if (!roomCode.trim() || !playerName.trim()) {
      setError('Please enter both room code and your name');
      return;
    }

    setJoining(true);
    setError('');

    try {
      // Check if room exists
      const roomRef = ref(database, `rooms/${roomCode.toUpperCase()}`);
      const snapshot = await get(roomRef);

      if (!snapshot.exists()) {
        setError('Room not found. Check the code and try again.');
        setJoining(false);
        return;
      }

      const roomData = snapshot.val();

      // Check if room is full
      const currentPlayers = Object.keys(roomData.players || {}).length;
      if (currentPlayers >= MAX_PLAYERS) {
        setError(`Room is full! Maximum ${MAX_PLAYERS} players allowed.`);
        setJoining(false);
        return;
      }

      // Check if game already started
      if (roomData.status !== 'lobby') {
        setError('Game already started. Please wait for the next round.');
        setJoining(false);
        return;
      }

      // Add player to room
      const playerId = `player_${Date.now()}`;
      const playerRef = ref(database, `rooms/${roomCode.toUpperCase()}/players/${playerId}`);
      
      await set(playerRef, {
        id: playerId,
        name: playerName.trim(),
        score: 0,
        joinedAt: Date.now()
      });

      // Navigate to player view
      router.push(`/play/${roomCode.toUpperCase()}?playerId=${playerId}`);
    } catch (err) {
      console.error('Error joining room:', err);
      setError('Failed to join room. Please try again.');
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-amber-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">🦃</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Game</h2>
          <p className="text-gray-600">Enter your name to play</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Room Code</label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              className="w-full px-4 py-3 text-2xl text-center font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 uppercase"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Your Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              maxLength={20}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={joinRoom}
            disabled={joining}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-colors disabled:opacity-50"
          >
            {joining ? 'Joining...' : 'Join Game'}
          </button>
        </div>
      </div>
    </div>
  );
}