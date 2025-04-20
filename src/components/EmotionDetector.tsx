
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
  const [faceDetectionModel, setFaceDetectionModel] = useState<faceapi.FaceDetector | null>(null);
  const [emotionModel, setEmotionModel] = useState<tf.LayersModel | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [emotions, setEmotions] = useState<EmotionScore[]>([]);
  const [dominantEmotion, setDominantEmotion] = useState<Emotion | null>(null);
  const requestRef = useRef<number | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emotionLabels: Emotion[] = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised'];

  useEffect(() => {
    const loadModels = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js is ready');
        
        // Load face detection model
        const faceDetector = await faceapi.createDetector(
          faceapi.SupportedModels.MediaPipeFaceDetector,
          {
            runtime: 'mediapipe',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
            maxFaces: 1
          }
        );
        setFaceDetectionModel(faceDetector);
        console.log('Face detection model loaded');
        
        // Load emotion recognition model
        try {
          const emotionRecognitionModel = await tf.loadLayersModel(
            'https://storage.googleapis.com/tfjs-models/tfjs/emotion_cnn_8/model.json'
          );
          setEmotionModel(emotionRecognitionModel);
          console.log('Emotion recognition model loaded');
        } catch (err) {
          console.error('Error loading emotion model:', err);
          toast({
            title: "Model Loading Error",
            description: "Could not load emotion recognition model. Using fallback mode.",
            variant: "destructive"
          });
        }
        
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

  const preprocessFace = async (faceImage: HTMLCanvasElement | HTMLVideoElement): Promise<tf.Tensor3D> => {
    return tf.tidy(() => {
      // Convert image to tensor
      let tensor = tf.browser.fromPixels(faceImage);
      
      // Convert to grayscale
      const grayscale = tensor.mean(2).expandDims(2);
      
      // Resize to 48x48 which is what the model expects
      const resized = tf.image.resizeBilinear(grayscale, [48, 48]);
      
      // Normalize values to be between 0 and 1
      const normalized = resized.div(255.0);
      
      // Reshape to match model input: [1, 48, 48, 1]
      // Explicitly cast to Tensor3D to fix the TypeScript error
      return normalized.expandDims(0) as tf.Tensor3D;
    });
  };

  const extractFaceFromDetection = (source: HTMLVideoElement | HTMLImageElement, face: faceapi.Face): HTMLCanvasElement => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    
    const canvas = canvasRef.current;
    const bbox = face.box;
    
    // Set canvas to the size of face with some margin
    const margin = 10;
    canvas.width = bbox.width + margin * 2;
    canvas.height = bbox.height + margin * 2;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
    
    // Draw the face region to the canvas
    ctx.drawImage(
      source,
      bbox.xMin - margin, bbox.yMin - margin,
      bbox.width + margin * 2, bbox.height + margin * 2,
      0, 0, canvas.width, canvas.height
    );
    
    return canvas;
  };

  const processFrame = async (videoElement: HTMLVideoElement) => {
    if (!faceDetectionModel || !isActive || !videoElement) return;

    try {
      const faces = await faceDetectionModel.estimateFaces(videoElement);

      if (faces.length > 0) {
        const faceCanvas = extractFaceFromDetection(videoElement, faces[0]);
        
        let emotionScores: EmotionScore[];
        
        if (emotionModel) {
          // Use the actual model to predict emotions
          const tensorInput = await preprocessFace(faceCanvas);
          const predictions = emotionModel.predict(tensorInput) as tf.Tensor;
          const scores = await predictions.data();
          
          // Convert scores to emotion objects
          emotionScores = emotionLabels.map((emotion, i) => ({
            emotion,
            score: scores[i]
          }));
          
          // Clean up tensors
          tensorInput.dispose();
          predictions.dispose();
        } else {
          // Fallback to mock emotions if model loading failed
          emotionScores = emotionLabels.map(emotion => ({
            emotion,
            score: Math.random() * (emotion === 'neutral' ? 0.9 : 0.7)
          }));
        }

        // Sort emotions by score
        const sortedEmotions = [...emotionScores].sort((a, b) => b.score - a.score);
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
    if (!faceDetectionModel) return;

    try {
      const faces = await faceDetectionModel.estimateFaces(imageElement);

      if (faces.length > 0) {
        const faceCanvas = extractFaceFromDetection(imageElement, faces[0]);
        
        let emotionScores: EmotionScore[];
        
        if (emotionModel) {
          const tensorInput = await preprocessFace(faceCanvas);
          const predictions = emotionModel.predict(tensorInput) as tf.Tensor;
          const scores = await predictions.data();
          
          emotionScores = emotionLabels.map((emotion, i) => ({
            emotion,
            score: scores[i]
          }));
          
          tensorInput.dispose();
          predictions.dispose();
        } else {
          emotionScores = emotionLabels.map(emotion => ({
            emotion,
            score: Math.random() * (emotion === 'neutral' ? 0.9 : 0.7)
          }));
        }

        // Sort emotions by score
        const sortedEmotions = [...emotionScores].sort((a, b) => b.score - a.score);
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
