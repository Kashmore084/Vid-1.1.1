import React from 'react';
import { TimelineClipProps } from '../../types/editor';

export const TimelineClip: React.FC<TimelineClipProps> = ({ clip, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(clip.id)}
      className={`relative h-16 bg-gray-800 rounded cursor-pointer transition-colors ${
        isSelected ? 'ring-2 ring-indigo-500' : ''
      }`}
      style={{ width: `${(clip.duration / 60) * 100}%` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-white truncate px-2">{clip.name}</span>
      </div>
    </div>
  );
};