
import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';
import { CameraViewRef } from '../App';

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55a1 1 0 011.45.89V18.11a1 1 0 01-1.45.89L15 15M3 7a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
);


export const CameraView = forwardRef<CameraViewRef, {}>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Camera access denied. Please enable camera permissions in your browser settings.");
      }
    };

    enableCamera();

    return () => {
      // Cleanup: stop all tracks on component unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    takeSnapshot: () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        if (context) {
          // Flip the image horizontally for a mirror effect
          context.translate(video.videoWidth, 0);
          context.scale(-1, 1);
          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          return canvas.toDataURL('image/jpeg');
        }
      }
      return null;
    }
  }));

  if (error) {
      return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-center p-4">
              <CameraIcon />
              <p className="mt-2 text-sm text-red-400">{error}</p>
          </div>
      );
  }

  return (
    <>
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
});
