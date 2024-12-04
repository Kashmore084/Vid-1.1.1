import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Preview } from '../components/VideoEditor/Preview';
import { Timeline } from '../components/VideoEditor/Timeline';
import { useVideoEditorStore } from '../store/useVideoEditorStore';

export const Editor: React.FC = () => {
  const { addClip } = useVideoEditorStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'video/*': [] },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.src = url;
        
        await new Promise<void>((resolve) => {
          video.onloadedmetadata = () => {
            addClip({
              name: file.name,
              url,
              duration: video.duration,
              startTime: 0,
              endTime: video.duration
            });
            resolve();
          };
        });
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div {...getRootProps()} className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
        `}>
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop video files here, or click to select files
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Preview />
          <Timeline />
        </div>
      </div>
    </div>
  );
};