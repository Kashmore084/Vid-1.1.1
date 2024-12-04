import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { VideoControlsProps } from '../../types/editor';

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  onPlayPause,
  onSkipForward,
  onSkipBackward,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="p-2 rounded hover:bg-gray-800"
        onClick={onSkipBackward}
      >
        <SkipBack className="w-6 h-6 text-white" />
      </button>
      
      <button
        className="p-2 rounded hover:bg-gray-800"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )}
      </button>
      
      <button
        className="p-2 rounded hover:bg-gray-800"
        onClick={onSkipForward}
      >
        <SkipForward className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};