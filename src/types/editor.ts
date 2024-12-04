export interface VideoClip {
  id: string;
  name: string;
  url: string;
  duration: number;
  startTime: number;
  endTime: number;
}

export interface TimelineClipProps {
  clip: VideoClip;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
}