
import React from 'react';
import { Sparkle, Star, Info } from 'lucide-react';
import EmotionDetector from '@/components/EmotionDetector';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 p-4 md:p-8">
      <header className="w-full max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <Sparkle className="w-8 h-8 text-purple-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Screen Soul Scanner
          </h1>
          <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
        
        <p className="text-muted-foreground text-center md:text-left mt-4 text-lg max-w-2xl leading-relaxed">
          Experience cutting-edge emotion detection technology that analyzes facial expressions in real-time, 
          providing instant insights into emotional states with precision and privacy.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 shadow-lg">
            <Star className="w-5 h-5 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-purple-400">High Precision</h3>
            <p className="text-sm text-muted-foreground mt-2">Advanced AI algorithms ensure accurate emotion detection in real-time.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 shadow-lg">
            <Info className="w-5 h-5 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-purple-400">Privacy First</h3>
            <p className="text-sm text-muted-foreground mt-2">All processing happens locally in your browser. Your data stays with you.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-purple-500/20 shadow-lg">
            <Sparkle className="w-5 h-5 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-purple-400">Dual Input</h3>
            <p className="text-sm text-muted-foreground mt-2">Choose between real-time webcam analysis or image upload.</p>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        <EmotionDetector />

        <section className="mt-12 bg-white/5 backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto border border-purple-500/20">
          <h2 className="text-2xl font-semibold mb-6 text-purple-400">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <Star className="w-4 h-4 text-purple-400" />
              </span>
              <span>Choose your preferred input method - webcam for real-time analysis or upload an image</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <Star className="w-4 h-4 text-purple-400" />
              </span>
              <span>Our AI model processes the input and detects facial features with high precision</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <Star className="w-4 h-4 text-purple-400" />
              </span>
              <span>Advanced algorithms analyze the detected features to determine emotional states</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1">
                <Star className="w-4 h-4 text-purple-400" />
              </span>
              <span>View detailed results showing primary and secondary emotions with confidence scores</span>
            </li>
          </ol>
          <p className="mt-6 text-sm text-muted-foreground bg-purple-950/20 p-4 rounded-lg border border-purple-500/20">
            Note: Screen Soul Scanner uses state-of-the-art machine learning models to ensure accurate emotion detection 
            while maintaining complete privacy by processing all data locally in your browser.
          </p>
        </section>
      </main>

      <footer className="w-full max-w-6xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p className="text-purple-400">© 2025 Screen Soul Scanner - Premium Emotion Detection Technology</p>
      </footer>
    </div>
  );
};

export default Index;
