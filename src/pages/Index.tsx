
import React from 'react';
import { Sparkle, Star, Info, Layout, Palette } from 'lucide-react';
import EmotionDetector from '@/components/EmotionDetector';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 min-h-screen">
        <header className="w-full max-w-6xl mx-auto pt-12 mb-12 relative z-10">
          {/* Premium gradient border header section */}
          <div className="p-0.5 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400">
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Sparkle className="w-8 h-8 text-purple-500" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 bg-clip-text text-transparent">
                  Screen Soul Scanner
                </h1>
                <Star className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              
              <p className="text-gray-600 text-center md:text-left mt-4 text-lg max-w-2xl leading-relaxed">
                Experience cutting-edge emotion detection technology that analyzes facial expressions in real-time, 
                providing instant insights into emotional states with precision and privacy.
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-gradient-to-br from-purple-50 to-white p-0.5 rounded-xl shadow-xl">
              <div className="bg-white p-6 rounded-xl h-full">
                <Star className="w-5 h-5 text-purple-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">High Precision</h3>
                <p className="text-sm text-gray-600 mt-2">Advanced AI algorithms ensure accurate emotion detection in real-time.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-0.5 rounded-xl shadow-xl">
              <div className="bg-white p-6 rounded-xl h-full">
                <Info className="w-5 h-5 text-pink-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">Privacy First</h3>
                <p className="text-sm text-gray-600 mt-2">All processing happens locally in your browser. Your data stays with you.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white p-0.5 rounded-xl shadow-xl">
              <div className="bg-white p-6 rounded-xl h-full">
                <Layout className="w-5 h-5 text-indigo-500 mb-3" />
                <h3 className="text-lg font-semibold text-gray-800">Dual Input</h3>
                <p className="text-sm text-gray-600 mt-2">Choose between real-time webcam analysis or image upload.</p>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full max-w-6xl mx-auto relative z-10 px-4">
          <EmotionDetector />

          <section className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 p-0.5 rounded-2xl">
              <div className="bg-white p-8 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Palette className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
                </div>

                <div className="grid gap-12">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2">
                      <AspectRatio ratio={16/9} className="bg-gradient-to-br from-purple-100 to-transparent rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                          alt="Person using webcam"
                          className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                        />
                      </AspectRatio>
                    </div>
                    <div className="w-full md:w-1/2 flex items-start gap-3">
                      <span className="mt-1">
                        <Star className="w-4 h-4 text-purple-500" />
                      </span>
                      <p className="text-gray-600">Choose your preferred input method - webcam for real-time analysis or upload an image</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                    <div className="w-full md:w-1/2">
                      <AspectRatio ratio={16/9} className="bg-gradient-to-br from-pink-100 to-transparent rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                          alt="AI Processing"
                          className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                        />
                      </AspectRatio>
                    </div>
                    <div className="w-full md:w-1/2 flex items-start gap-3">
                      <span className="mt-1">
                        <Star className="w-4 h-4 text-pink-500" />
                      </span>
                      <p className="text-gray-600">Our AI model processes the input and detects facial features with high precision</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2">
                      <AspectRatio ratio={16/9} className="bg-gradient-to-br from-indigo-100 to-transparent rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                          alt="Advanced Analysis"
                          className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-300"
                        />
                      </AspectRatio>
                    </div>
                    <div className="w-full md:w-1/2 flex items-start gap-3">
                      <span className="mt-1">
                        <Star className="w-4 h-4 text-indigo-500" />
                      </span>
                      <p className="text-gray-600">Advanced algorithms analyze the detected features to determine emotional states</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-xl">
                  <p className="text-center text-gray-600">
                    Screen Soul Scanner uses state-of-the-art machine learning models to ensure accurate emotion detection 
                    while maintaining complete privacy by processing all data locally in your browser.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full max-w-6xl mx-auto mt-16 pb-8 text-center text-sm text-gray-500 relative z-10">
          <p>© 2025 Screen Soul Scanner - Premium Emotion Detection Technology</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
