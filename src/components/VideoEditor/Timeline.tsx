import React from 'react';
import { Scissors, Trash2 } from 'lucide-react';
import { useVideoEditorStore } from '../../store/useVideoEditorStore';
import { TimelineClip } from './TimelineClip';

export const Timeline: React.FC = () => {
  const { clips, selectedClipId, selectClip, removeClip, splitClipAtTime } = useVideoEditorStore();

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center space-x-4 mb-4">
        <button
          className="p-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
          onClick={() => selectedClipId && splitClipAtTime(selectedClipId)}
          disabled={!selectedClipId}
        >
          <Scissors className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
          onClick={() => selectedClipId && removeClip(selectedClipId)}
          disabled={!selectedClipId}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {clips.map((clip) => (
          <TimelineClip
            key={clip.id}
            clip={clip}
            isSelected={selectedClipId === clip.id}
            onSelect={selectClip}
          />
        ))}
      </div>
    </div>
  );
};