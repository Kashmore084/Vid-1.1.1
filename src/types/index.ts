export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isSubscribed: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  userId: string;
  createdAt: string;
  isPublic: boolean;
  isAdvertiserFriendly: boolean;
  status: 'processing' | 'ready' | 'failed';
  views: number;
  likes: number;
}