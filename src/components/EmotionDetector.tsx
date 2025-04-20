
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceapi from '@tensorflow-models/face-detection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Webcam } from './Webcam';
import { EmotionDisplay } from './EmotionDisplay';
import { LoadingIndicator } from './LoadingIndicator';
import { ImageUpload } from './ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type Emotion = 'happy' | 'sad' | 'angry' | 'surprised' | 'neutral' | 'fearful' | 'disgusted';

export interface EmotionScore {
  emotion: Emotion;
  score: number;
}

const EmotionDetector: React.FC = () => {
  const { toast } = useToast();
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [model, setModel] = useState<faceapi.FaceDetector | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [emotions, setEmotions] = useState<EmotionScore[]>([]);
  const [dominantEmotion, setDominantEmotion] = useState<Emotion | null>(null);
  const requestRef = useRef<number | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js is ready');
        
        const faceDetectionModel = await faceapi.createDetector(
          faceapi.SupportedModels.MediaPipeFaceDetector,
          {
            runtime: 'mediapipe',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
            maxFaces: 1
          }
        );
        
        console.log('Face detection model loaded');
        setModel(faceDetectionModel);
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        toast({
          title: "Error",
          description: "Failed to load emotion detection models.",
          variant: "destructive"
        });
        setIsModelLoading(false);
      }
    };

    loadModels();

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [toast]);

  const startDetection = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      setIsActive(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraPermission(false);
      toast({
        title: "Camera Access Denied",
        description: "Please allow access to your camera to use emotion detection.",
        variant: "destructive"
      });
    }
  };

  const stopDetection = () => {
    setIsActive(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  const processFrame = async (videoElement: HTMLVideoElement) => {
    if (!model || !isActive || !videoElement) return;

    try {
      const faces = await model.estimateFaces(videoElement);

      if (faces.length > 0) {
        const mockEmotions: EmotionScore[] = [
          { emotion: 'happy', score: Math.random() },
          { emotion: 'sad', score: Math.random() * 0.7 },
          { emotion: 'angry', score: Math.random() * 0.5 },
          { emotion: 'surprised', score: Math.random() * 0.6 },
          { emotion: 'neutral', score: Math.random() * 0.8 },
          { emotion: 'fearful', score: Math.random() * 0.4 },
          { emotion: 'disgusted', score: Math.random() * 0.3 }
        ];

        const sortedEmotions = [...mockEmotions].sort((a, b) => b.score - a.score);
        setEmotions(sortedEmotions);
        setDominantEmotion(sortedEmotions[0].emotion);
      } else {
        setEmotions([]);
        setDominantEmotion(null);
      }

      if (isActive) {
        requestRef.current = requestAnimationFrame(() => processFrame(videoElement));
      }
    } catch (error) {
      console.error('Error processing frame:', error);
    }
  };

  const processImage = async (imageElement: HTMLImageElement) => {
    if (!model) return;

    try {
      const faces = await model.estimateFaces(imageElement);

      if (faces.length > 0) {
        const mockEmotions: EmotionScore[] = [
          { emotion: 'happy', score: Math.random() },
          { emotion: 'sad', score: Math.random() * 0.7 },
          { emotion: 'angry', score: Math.random() * 0.5 },
          { emotion: 'surprised', score: Math.random() * 0.6 },
          { emotion: 'neutral', score: Math.random() * 0.8 },
          { emotion: 'fearful', score: Math.random() * 0.4 },
          { emotion: 'disgusted', score: Math.random() * 0.3 }
        ];

        const sortedEmotions = [...mockEmotions].sort((a, b) => b.score - a.score);
        setEmotions(sortedEmotions);
        setDominantEmotion(sortedEmotions[0].emotion);
      } else {
        setEmotions([]);
        setDominantEmotion(null);
        toast({
          title: "No Face Detected",
          description: "Please ensure there's a clear face in the image.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Error",
        description: "Failed to process the image.",
        variant: "destructive"
      });
    }
  };

  const handleImageSelect = (image: HTMLImageElement) => {
    setSelectedImage(image);
    processImage(image);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <Card className="w-full p-6 bg-opacity-90 backdrop-blur-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Emotion Detector</h2>
          </div>
          
          {isModelLoading ? (
            <LoadingIndicator message="Loading emotion detection models..." />
          ) : (
            <Tabs defaultValue="webcam" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="webcam">Webcam</TabsTrigger>
                <TabsTrigger value="image">Upload Image</TabsTrigger>
              </TabsList>

              <TabsContent value="webcam">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-end">
                    {!isActive ? (
                      <Button 
                        onClick={startDetection} 
                        className="bg-emotion-happy hover:bg-emotion-happy/90 text-white"
                      >
                        Start Detection
                      </Button>
                    ) : (
                      <Button 
                        onClick={stopDetection}
                        className="bg-emotion-neutral hover:bg-emotion-neutral/90 text-white"
                      >
                        Stop Detection
                      </Button>
                    )}
                  </div>
                  <Webcam 
                    isActive={isActive} 
                    onVideoRef={(videoElement) => {
                      if (videoElement && isActive) {
                        processFrame(videoElement);
                      }
                    }}
                    cameraPermission={cameraPermission}
                  />
                </div>
              </TabsContent>

              <TabsContent value="image">
                <ImageUpload onImageSelect={handleImageSelect} />
                {selectedImage && (
                  <div className="mt-4">
                    <img
                      src={selectedImage.src}
                      alt="Uploaded image"
                      className="max-h-[400px] w-full object-contain rounded-lg"
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
          
          {(isActive || selectedImage) && emotions.length > 0 && (
            <EmotionDisplay 
              emotions={emotions}
              dominantEmotion={dominantEmotion}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmotionDetector;
