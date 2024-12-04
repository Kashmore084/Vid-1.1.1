import { create } from 'zustand';
import { VideoClip } from '../types/editor';

interface VideoEditorState {
  clips: VideoClip[];
  selectedClipId: string | null;
  currentTime: number;
  isPlaying: boolean;
  addClip: (clip: Omit<VideoClip, 'id'>) => void;
  removeClip: (id: string) => void;
  selectClip: (id: string) => void;
  splitClipAtTime: (id: string) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  selectedClip: VideoClip | null;
}

export const useVideoEditorStore = create<VideoEditorState>((set, get) => ({
  clips: [],
  selectedClipId: null,
  currentTime: 0,
  isPlaying: false,
  
  addClip: (clip) => set((state) => ({
    clips: [...state.clips, { ...clip, id: Math.random().toString(36).substr(2, 9) }]
  })),
  
  removeClip: (id) => set((state) => ({
    clips: state.clips.filter((clip) => clip.id !== id),
    selectedClipId: state.selectedClipId === id ? null : state.selectedClipId
  })),
  
  selectClip: (id) => set({ selectedClipId: id }),
  
  splitClipAtTime: (id) => set((state) => {
    const clip = state.clips.find((c) => c.id === id);
    if (!clip || state.currentTime <= clip.startTime || state.currentTime >= clip.endTime) {
      return state;
    }
    
    const clipIndex = state.clips.findIndex((c) => c.id === id);
    const newClips = [...state.clips];
    
    const clip1 = {
      ...clip,
      id: Math.random().toString(36).substr(2, 9),
      endTime: state.currentTime
    };
    
    const clip2 = {
      ...clip,
      id: Math.random().toString(36).substr(2, 9),
      startTime: state.currentTime
    };
    
    newClips.splice(clipIndex, 1, clip1, clip2);
    
    return {
      clips: newClips,
      selectedClipId: clip1.id
    };
  }),
  
  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  get selectedClip() {
    const state = get();
    return state.clips.find((clip) => clip.id === state.selectedClipId) || null;
  }
}));