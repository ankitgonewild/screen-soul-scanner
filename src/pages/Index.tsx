
import React from 'react';
import { Smile } from 'lucide-react';
import EmotionDetector from '@/components/EmotionDetector';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 md:p-8">
      <header className="w-full max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Smile className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Screen Soul Scanner</h1>
        </div>
        <p className="text-muted-foreground text-center md:text-left mt-2 max-w-xl">
          Analyze facial expressions in real-time to detect emotions using your laptop's camera.
        </p>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        <EmotionDetector />

        <section className="mt-12 bg-white/50 dark:bg-black/20 backdrop-blur-sm p-6 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Click the "Start Detection" button to activate your camera</li>
            <li>Position your face within the camera view</li>
            <li>The system will analyze your facial expressions in real-time</li>
            <li>View your current emotional state and its intensity</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            Note: All processing happens locally in your browser. No video data is sent to any server.
          </p>
        </section>
      </main>

      <footer className="w-full max-w-6xl mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>© 2025 Screen Soul Scanner - Privacy-focused emotion detection</p>
      </footer>
    </div>
  );
};

export default Index;
