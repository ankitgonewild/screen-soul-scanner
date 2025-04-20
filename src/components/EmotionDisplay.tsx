
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Smile, Frown, X, AlertCircle, Meh, Heart } from 'lucide-react';
import { type Emotion, type EmotionScore } from './EmotionDetector';

interface EmotionDisplayProps {
  emotions: EmotionScore[];
  dominantEmotion: Emotion | null;
}

export const EmotionDisplay: React.FC<EmotionDisplayProps> = ({ 
  emotions,
  dominantEmotion
}) => {
  const getEmotionIcon = (emotion: Emotion) => {
    switch(emotion) {
      case 'happy':
        return <Smile className="w-6 h-6 text-emotion-happy" />;
      case 'sad':
        return <Frown className="w-6 h-6 text-emotion-sad" />;
      case 'angry':
        return <X className="w-6 h-6 text-emotion-angry" />;
      case 'surprised':
        return <AlertCircle className="w-6 h-6 text-emotion-surprised" />;
      case 'neutral':
        return <Meh className="w-6 h-6 text-emotion-neutral" />;
      case 'fearful':
        return <AlertCircle className="w-6 h-6 text-emotion-fearful" />;
      case 'disgusted':
        return <X className="w-6 h-6 text-emotion-disgusted" />;
      default:
        return <Heart className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getEmotionDescription = (emotion: Emotion) => {
    switch(emotion) {
      case 'happy':
        return "You appear to be happy and content.";
      case 'sad':
        return "You seem to be feeling sad or down.";
      case 'angry':
        return "You appear to be expressing anger.";
      case 'surprised':
        return "You look surprised or astonished.";
      case 'neutral':
        return "Your expression appears neutral.";
      case 'fearful':
        return "You seem to be expressing fear or anxiety.";
      case 'disgusted':
        return "You appear to be expressing disgust.";
      default:
        return "Unable to determine your emotion.";
    }
  };
  
  const getEmotionColor = (emotion: Emotion) => {
    switch(emotion) {
      case 'happy': return 'bg-emotion-happy';
      case 'sad': return 'bg-emotion-sad';
      case 'angry': return 'bg-emotion-angry';
      case 'surprised': return 'bg-emotion-surprised';
      case 'neutral': return 'bg-emotion-neutral';
      case 'fearful': return 'bg-emotion-fearful';
      case 'disgusted': return 'bg-emotion-disgusted';
      default: return 'bg-muted';
    }
  };

  if (!dominantEmotion) {
    return (
      <div className="mt-4 p-4 bg-muted/30 rounded-md">
        <p className="text-muted-foreground text-center">No face detected</p>
      </div>
    );
  }

  return (
    <div className="mt-6 animate-fade-in">
      {/* Main emotion display */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 rounded-lg bg-muted/20">
        <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm">
          {getEmotionIcon(dominantEmotion)}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-semibold capitalize mb-1">{dominantEmotion}</h3>
          <p className="text-sm text-muted-foreground">{getEmotionDescription(dominantEmotion)}</p>
        </div>
      </div>

      {/* Emotion scores */}
      <div className="space-y-3">
        {emotions.map((item) => (
          <div key={item.emotion} className="grid grid-cols-12 items-center gap-2">
            <div className="col-span-3 sm:col-span-2 text-sm font-medium capitalize">
              {item.emotion}
            </div>
            <div className="col-span-7 sm:col-span-9">
              <Progress 
                value={item.score * 100} 
                className={`h-2 ${getEmotionColor(item.emotion)}`} 
              />
            </div>
            <div className="col-span-2 sm:col-span-1 text-sm text-right">
              {Math.round(item.score * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
