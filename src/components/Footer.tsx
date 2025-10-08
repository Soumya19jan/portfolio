import React from 'react';
import { Heart, Settings } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo & Copyright */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative">
                <Settings className="w-6 h-6 text-cyan-400 gear-animation" />
              </div>
              <span className="text-lg font-bold font-orbitron text-white">
                Soumyadeep<span className="text-cyan-400">.</span>Maity
              </span>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>by Soumyadeep Maity</span>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              Designing the future through robotics and AI innovation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;