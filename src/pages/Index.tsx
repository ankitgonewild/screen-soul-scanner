import React from 'react';
import { Sparkle, Star, Info } from 'lucide-react';
import EmotionDetector from '@/components/EmotionDetector';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat" 
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), 
          url('https://images.unsplash.com/photo-1483058712412-4245e9b90334')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="relative z-10 min-h-screen bg-transparent text-white">
        <header className="w-full max-w-6xl mx-auto mb-12 relative z-10">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Sparkle className="w-8 h-8 text-purple-300" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
              Screen Soul Scanner
            </h1>
            <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          
          <p className="text-white/80 text-center md:text-left mt-4 text-lg max-w-2xl leading-relaxed">
            Experience cutting-edge emotion detection technology that analyzes facial expressions in real-time, 
            providing instant insights into emotional states with precision and privacy.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 shadow-xl">
              <Star className="w-5 h-5 text-purple-300 mb-3" />
              <h3 className="text-lg font-semibold text-white">High Precision</h3>
              <p className="text-sm text-white/70 mt-2">Advanced AI algorithms ensure accurate emotion detection in real-time.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 shadow-xl">
              <Info className="w-5 h-5 text-purple-300 mb-3" />
              <h3 className="text-lg font-semibold text-white">Privacy First</h3>
              <p className="text-sm text-white/70 mt-2">All processing happens locally in your browser. Your data stays with you.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg border border-white/20 shadow-xl">
              <Sparkle className="w-5 h-5 text-purple-300 mb-3" />
              <h3 className="text-lg font-semibold text-white">Dual Input</h3>
              <p className="text-sm text-white/70 mt-2">Choose between real-time webcam analysis or image upload.</p>
            </div>
          </div>
        </header>

        <main className="w-full max-w-6xl mx-auto relative z-10">
          <EmotionDetector />

          <section className="mt-12 bg-white/10 backdrop-blur-lg p-8 rounded-lg max-w-4xl mx-auto border border-white/20">
            <h2 className="text-2xl font-semibold mb-8 text-white text-center">How It Works</h2>
            <div className="grid gap-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                      alt="Person using webcam"
                      className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                </div>
                <div className="w-full md:w-1/2 flex items-start gap-3">
                  <span className="mt-1">
                    <Star className="w-4 h-4 text-purple-300" />
                  </span>
                  <p className="text-white/70">Choose your preferred input method - webcam for real-time analysis or upload an image</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                      alt="AI Processing"
                      className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                </div>
                <div className="w-full md:w-1/2 flex items-start gap-3">
                  <span className="mt-1">
                    <Star className="w-4 h-4 text-purple-300" />
                  </span>
                  <p className="text-white/70">Our AI model processes the input and detects facial features with high precision</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                      alt="Advanced Analysis"
                      className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                </div>
                <div className="w-full md:w-1/2 flex items-start gap-3">
                  <span className="mt-1">
                    <Star className="w-4 h-4 text-purple-300" />
                  </span>
                  <p className="text-white/70">Advanced algorithms analyze the detected features to determine emotional states</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                      alt="Results Display"
                      className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                    />
                  </AspectRatio>
                </div>
                <div className="w-full md:w-1/2 flex items-start gap-3">
                  <span className="mt-1">
                    <Star className="w-4 h-4 text-purple-300" />
                  </span>
                  <p className="text-white/70">View detailed results showing primary and secondary emotions with confidence scores</p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-white/70 bg-purple-950/20 p-4 rounded-lg border border-white/20">
              Note: Screen Soul Scanner uses state-of-the-art machine learning models to ensure accurate emotion detection 
              while maintaining complete privacy by processing all data locally in your browser.
            </p>
          </section>
        </main>

        <footer className="w-full max-w-6xl mx-auto mt-12 text-center text-sm text-white/80 relative z-10">
          <p className="text-white">© 2025 Screen Soul Scanner - Premium Emotion Detection Technology</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
