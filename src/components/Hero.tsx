import React, { useEffect, useRef, useState } from 'react';
import { Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Large Central Gear */}
        <div 
          className="absolute w-48 h-48 opacity-10"
          style={{
            top: '30%',
            left: '15%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="gear-animation">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            {[...Array(16)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="5"
                width="4"
                height="12"
                fill="currentColor"
                className="text-cyan-400"
                transform={`rotate(${i * 22.5} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Medium Gears */}
        <div 
          className="absolute w-32 h-32 opacity-15"
          style={{
            top: '60%',
            right: '20%',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="gear-animation-reverse">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="3" className="text-orange-400" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" />
            {[...Array(12)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="10"
                width="4"
                height="10"
                fill="currentColor"
                className="text-orange-400"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Small Gears */}
        <div 
          className="absolute w-20 h-20 opacity-20"
          style={{
            top: '20%',
            right: '30%',
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="gear-animation">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="15"
                width="4"
                height="8"
                fill="currentColor"
                className="text-purple-400"
                transform={`rotate(${i * 45} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Enhanced Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60 float-animation"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: ['#00f5ff', '#ff6b35', '#7c3aed'][Math.floor(Math.random() * 3)],
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              boxShadow: `0 0 10px currentColor`,
            }}
          />
        ))}

        {/* Circuit Board Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="text-cyan-400">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="10" cy="10" r="2" fill="currentColor"/>
                <circle cx="90" cy="10" r="2" fill="currentColor"/>
                <circle cx="90" cy="90" r="2" fill="currentColor"/>
                <circle cx="10" cy="90" r="2" fill="currentColor"/>
                <path d="M50,10 L50,90" stroke="currentColor" strokeWidth="0.5"/>
                <path d="M10,50 L90,50" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-4 slide-in-up">
            <span className="text-white">Soumyadeep</span>
            <span className="text-cyan-400 text-glow hologram-text"> </span>
            <span className="text-white">Maity</span>
          </h1>
          <div className="text-xl md:text-2xl font-rajdhani text-gray-300 mb-6 slide-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-orange-400 font-semibold hologram-text">Robotics Engineer</span> & 
            <span className="text-purple-400 font-semibold hologram-text"> AI Specialist</span>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed slide-in-up" style={{ animationDelay: '0.4s' }}>
            Designing the future through intelligent automation, advanced robotics, and cutting-edge AI solutions. 
            Transforming complex challenges into elegant mechanical poetry.
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-in-up" style={{ animationDelay: '0.6s' }}>
          <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 box-glow flex items-center space-x-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Download className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Download CV</span>
          </button>
          <button className="group px-8 py-4 border border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500 hover:text-black transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <span className="relative z-10">View Projects</span>
          </button>
        </div>

        {/* Enhanced Social Links */}
        <div className="flex justify-center space-x-6 mb-12 slide-in-up" style={{ animationDelay: '0.8s' }}>
          {[
            { icon: Github, href: '#', color: 'text-gray-400 hover:text-white', bg: 'hover:bg-gray-700' },
            { icon: Linkedin, href: '#', color: 'text-gray-400 hover:text-blue-400', bg: 'hover:bg-blue-900/30' },
            { icon: Mail, href: '#', color: 'text-gray-400 hover:text-cyan-400', bg: 'hover:bg-cyan-900/30' },
          ].map(({ icon: Icon, href, color, bg }, index) => (
            <a
              key={index}
              href={href}
              className={`${color} ${bg} transition-all duration-300 transform hover:scale-110 p-3 rounded-full border border-transparent hover:border-current/30 relative group`}
            >
              <Icon className="w-6 h-6 relative z-10" />
              <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </a>
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <ChevronDown className="w-8 h-8" />
            <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Robotic Arm Animation */}
      <div className="absolute bottom-10 right-10 opacity-30">
        <svg width="150" height="250" viewBox="0 0 150 250" className="text-cyan-400">
          <defs>
            <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#0080ff" />
            </linearGradient>
          </defs>
          
          {/* Base */}
          <rect x="65" y="220" width="20" height="30" fill="url(#armGradient)" rx="10" />
          <circle cx="75" cy="220" r="15" fill="url(#armGradient)" />
          
          {/* First Joint */}
          <g className="transform-origin-[75,220]" style={{ animation: 'rotate 8s ease-in-out infinite alternate' }}>
            <rect x="70" y="160" width="10" height="60" fill="url(#armGradient)" />
            <circle cx="75" cy="220" r="8" fill="url(#armGradient)" />
            <circle cx="75" cy="160" r="6" fill="url(#armGradient)" />
            
            {/* Second Joint */}
            <g className="transform-origin-[75,160]" style={{ animation: 'rotate 6s ease-in-out infinite alternate-reverse' }}>
              <rect x="70" y="100" width="10" height="60" fill="url(#armGradient)" />
              <circle cx="75" cy="160" r="6" fill="url(#armGradient)" />
              <circle cx="75" cy="100" r="4" fill="url(#armGradient)" />
              
              {/* End Effector */}
              <g className="transform-origin-[75,100]" style={{ animation: 'rotate 4s ease-in-out infinite alternate' }}>
                <rect x="70" y="60" width="10" height="40" fill="url(#armGradient)" />
                <circle cx="75" cy="100" r="4" fill="url(#armGradient)" />
                
                {/* Gripper */}
                <rect x="67" y="55" width="6" height="10" fill="url(#armGradient)" rx="3" />
                <rect x="77" y="55" width="6" height="10" fill="url(#armGradient)" rx="3" />
                
                {/* LED Indicator */}
                <circle cx="75" cy="50" r="2" fill="#ff6b35" className="animate-pulse" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;