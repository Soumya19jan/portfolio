import React, { useEffect, useRef, useState } from 'react';

const SophiaRobot: React.FC = () => {
  const sophiaRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [speechBubble, setSpeechBubble] = useState('');

  const speeches = [
    "Hello! I'm Sophia 🤖",
    "Welcome to Alex's portfolio!",
    "Impressive robotics work!",
    "The future is now!",
    "Let's build tomorrow together!",
    "AI + Robotics = Magic ✨"
  ];

  // Track scroll for robot movement
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Eye tracking mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sophiaRef.current) {
        const rect = sophiaRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Limit eye movement
        const maxMove = 3;
        const eyeX = Math.max(-maxMove, Math.min(maxMove, deltaX / 20));
        const eyeY = Math.max(-maxMove, Math.min(maxMove, deltaY / 20));
        
        setEyePosition({ x: eyeX, y: eyeY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random speech bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && Math.random() > 0.7) {
        const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
        setSpeechBubble(randomSpeech);
        setTimeout(() => setSpeechBubble(''), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Handle robot interactions
  const handleRobotClick = () => {
    setIsWaving(true);
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setSpeechBubble(randomSpeech);
    
    setTimeout(() => {
      setIsWaving(false);
      setSpeechBubble('');
    }, 3000);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setSpeechBubble("Hi there! 👋");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setSpeechBubble(''), 1000);
  };

  return (
    <>
      {/* Speech Bubble */}
      {speechBubble && (
        <div
          className="fixed right-72 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md border border-cyan-400/30 z-101 transition-all duration-300"
          style={{
            top: `${50 + scrollY * 0.1}%`,
            transform: 'translateY(-50%)',
            animation: 'slideInRight 0.3s ease-out',
          }}
        >
          {speechBubble}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-8 border-l-cyan-500 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
        </div>
      )}

      {/* Sophia Robot */}
      <div
        ref={sophiaRef}
        className="sophia-container"
        style={{
          transform: `translateY(${-50 + scrollY * 0.05}%) ${isHovered ? 'scale(1.1)' : 'scale(1)'}`,
          filter: isHovered ? 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.6))' : 'none',
        }}
      >
        <div
          className="sophia-robot"
          onClick={handleRobotClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Head */}
          <div
            className="sophia-head"
            style={{
              transform: isHovered ? 'rotate(5deg)' : 'rotate(0deg)',
              borderColor: isHovered ? 'rgba(0, 245, 255, 0.8)' : 'rgba(0, 245, 255, 0.3)',
            }}
          >
            {/* Eyes */}
            <div className="sophia-eyes">
              <div
                className="sophia-eye"
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                  boxShadow: isHovered ? '0 0 15px #00f5ff' : '0 0 10px #00f5ff',
                }}
              />
              <div
                className="sophia-eye"
                style={{
                  transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                  boxShadow: isHovered ? '0 0 15px #00f5ff' : '0 0 10px #00f5ff',
                }}
              />
            </div>

            {/* Mouth */}
            <div
              className="sophia-mouth"
              style={{
                width: isHovered || speechBubble ? '25px' : '20px',
                background: isHovered || speechBubble ? '#ff6b35' : 'rgba(0, 245, 255, 0.7)',
                borderRadius: speechBubble ? '10px' : '2px',
              }}
            />

            {/* LED indicators */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Body */}
          <div className="sophia-body">
            {/* Arms */}
            <div className="sophia-arms">
              <div
                className={`sophia-arm left ${isWaving ? 'animate-pulse' : ''}`}
                style={{
                  transform: isWaving ? 'rotate(-30deg)' : 'rotate(0deg)',
                  background: isHovered ? 'linear-gradient(90deg, #444, #333)' : 'linear-gradient(90deg, #333, #222)',
                }}
              />
              <div
                className={`sophia-arm right ${isWaving ? 'animate-pulse' : ''}`}
                style={{
                  transform: isWaving ? 'rotate(30deg)' : 'rotate(0deg)',
                  background: isHovered ? 'linear-gradient(90deg, #444, #333)' : 'linear-gradient(90deg, #333, #222)',
                }}
              />
            </div>

            {/* Chest panel */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-gray-800 rounded border border-cyan-500/30">
              <div className="w-full h-1 bg-cyan-400 mt-2 animate-pulse"></div>
              <div className="w-3/4 h-1 bg-orange-400 mt-1 ml-1 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1/2 h-1 bg-purple-400 mt-1 ml-2 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>

          {/* Legs */}
          <div
            className="sophia-legs"
            style={{
              borderColor: isHovered ? 'rgba(0, 245, 255, 0.5)' : 'rgba(0, 245, 255, 0.2)',
            }}
          >
            {/* Leg joints */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-cyan-400 rounded"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-cyan-400 rounded"></div>
          </div>

          {/* Floating data particles around Sophia */}
          {isHovered && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Holographic base */}
        <div className="w-24 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-50 mt-2 animate-pulse"></div>
      </div>
    </>
  );
};

export default SophiaRobot;