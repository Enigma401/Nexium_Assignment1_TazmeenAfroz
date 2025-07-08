'use client';

import { useState, useRef, useEffect } from 'react';
import { AudioPlayerState } from '../types';

export default function AudioPlayer() {
  const [playerState, setPlayerState] = useState<AudioPlayerState>({
    isPlaying: true, // Auto-play by default
    volume: 0.3
  });
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = playerState.volume;
    audio.loop = true;

    // Try to auto-play on mount
    if (playerState.isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play prevented by browser:', error);
          setPlayerState(prev => ({ ...prev, isPlaying: false }));
        });
      }
    } else {
      audio.pause();
    }
  }, [playerState.isPlaying, playerState.volume]);

  const togglePlayback = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setPlayerState(prev => ({
      ...prev,
      volume: newVolume
    }));
  };

  return (
    <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/rain.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={togglePlayback}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
          aria-label={playerState.isPlaying ? 'Pause rain sounds' : 'Play rain sounds'}
        >
          {playerState.isPlaying ? 'Pause Rain' : 'Play Rain'}
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">🌧️</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={playerState.volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
}
