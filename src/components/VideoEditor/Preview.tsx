import React, { useRef, useEffect } from 'react';
import { useVideoEditorStore } from '../../store/useVideoEditorStore';
import { VideoControls } from './VideoControls';

export const Preview: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTime, isPlaying, selectedClip, setCurrentTime, setIsPlaying } = useVideoEditorStore();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSkipForward = () => {
    if (selectedClip) {
      setCurrentTime(Math.min(selectedClip.duration, currentTime + 5));
    }
  };

  const handleSkipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 5));
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-video bg-black">
        {selectedClip ? (
          <video
            ref={videoRef}
            src={selectedClip.url}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No clip selected
          </div>
        )}
      </div>
      
      <div className="p-4">
        <VideoControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onSkipForward={handleSkipForward}
          onSkipBackward={handleSkipBackward}
        />
      </div>
    </div>
  );
};