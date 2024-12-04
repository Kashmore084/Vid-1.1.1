import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/video/${video.id}`} className="group">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{video.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <span>{video.views.toLocaleString()} views</span>
          <span className="mx-1">•</span>
          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};