
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Webcam as WebcamIcon } from 'lucide-react';

interface WebcamProps {
  isActive: boolean;
  onVideoRef: (videoElement: HTMLVideoElement | null) => void;
  cameraPermission: boolean | null;
}

export const Webcam: React.FC<WebcamProps> = ({ 
  isActive, 
  onVideoRef,
  cameraPermission
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (isActive && videoElement) {
      const startWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'user'
            }
          });
          
          videoElement.srcObject = stream;
          await videoElement.play();
          onVideoRef(videoElement);
        } catch (err) {
          console.error("Error accessing the webcam", err);
        }
      };
      
      startWebcam();
    } else if (videoElement && videoElement.srcObject) {
      // Stop the webcam when not active
      const stream = videoElement.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoElement.srcObject = null;
      onVideoRef(null);
    }
    
    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isActive, onVideoRef]);

  if (cameraPermission === false) {
    return (
      <Card className="flex flex-col items-center justify-center w-full h-80 bg-muted/30">
        <WebcamIcon className="w-16 h-16 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-center max-w-md">
          Camera access is required for emotion detection.
          <br />
          Please allow access in your browser settings and reload the page.
        </p>
      </Card>
    );
  }

  return (
    <div className="relative w-full">
      <div className="aspect-video rounded-md overflow-hidden bg-black w-full">
        {!isActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
            <WebcamIcon className="w-16 h-16 mb-4 animate-pulse-subtle" />
            <p className="text-lg">Click "Start Detection" to begin</p>
          </div>
        )}
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          style={{ display: isActive ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
};
