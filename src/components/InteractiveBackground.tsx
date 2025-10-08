import React, { useEffect, useRef, useState } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  repelled: boolean;
}

interface Gear {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  visible: boolean;
  teeth: number;
}

const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [gears, setGears] = useState<Gear[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  // Initialize dots
  useEffect(() => {
    const initDots = () => {
      const newDots: Dot[] = [];
      const spacing = 80;
      const cols = Math.ceil(window.innerWidth / spacing);
      const rows = Math.ceil(window.innerHeight / spacing);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * spacing + Math.random() * 20;
          const y = i * spacing + Math.random() * 20;
          newDots.push({
            id: i * cols + j,
            x,
            y,
            originalX: x,
            originalY: y,
            repelled: false,
          });
        }
      }
      setDots(newDots);
    };

    initDots();
    window.addEventListener('resize', initDots);
    return () => window.removeEventListener('resize', initDots);
  }, []);

  // Initialize gears
  useEffect(() => {
    const initGears = () => {
      const newGears: Gear[] = [];
      for (let i = 0; i < 15; i++) {
        newGears.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 30 + Math.random() * 60,
          rotation: 0,
          visible: false,
          teeth: 8 + Math.floor(Math.random() * 8),
        });
      }
      setGears(newGears);
    };

    initGears();
    window.addEventListener('resize', initGears);
    return () => window.removeEventListener('resize', initGears);
  }, []);

  // Mouse tracking and cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Update custom cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`;
        cursorRef.current.style.top = `${e.clientY - 10}px`;
      }

      // Update cursor trail
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          setTimeout(() => {
            trail.style.left = `${e.clientX - 3}px`;
            trail.style.top = `${e.clientY - 3}px`;
            trail.style.opacity = `${0.6 - index * 0.1}`;
          }, index * 50);
        }
      });

      // Repel dots
      setDots(prevDots =>
        prevDots.map(dot => {
          const distance = Math.sqrt(
            Math.pow(e.clientX - dot.originalX, 2) + Math.pow(e.clientY - dot.originalY, 2)
          );
          const repelDistance = 100;
          
          if (distance < repelDistance) {
            const angle = Math.atan2(dot.originalY - e.clientY, dot.originalX - e.clientX);
            const force = (repelDistance - distance) / repelDistance;
            const repelX = dot.originalX + Math.cos(angle) * force * 50;
            const repelY = dot.originalY + Math.sin(angle) * force * 50;
            
            return {
              ...dot,
              x: repelX,
              y: repelY,
              repelled: true,
            };
          } else {
            return {
              ...dot,
              x: dot.originalX,
              y: dot.originalY,
              repelled: false,
            };
          }
        })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for gears
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      // Update gear visibility and rotation based on scroll
      setGears(prevGears =>
        prevGears.map(gear => {
          const gearScreenY = gear.y - newScrollY;
          const visible = gearScreenY > -100 && gearScreenY < window.innerHeight + 100;
          const rotation = (newScrollY * 0.5 + gear.id * 10) % 360;
          
          return {
            ...gear,
            rotation,
            visible,
          };
        })
      );
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Matrix rain effect
  const MatrixRain = () => {
    const [columns, setColumns] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

    useEffect(() => {
      const newColumns = [];
      for (let i = 0; i < 20; i++) {
        newColumns.push({
          id: i,
          left: Math.random() * 100,
          duration: 3 + Math.random() * 4,
          delay: Math.random() * 2,
        });
      }
      setColumns(newColumns);
    }, []);

    return (
      <div className="matrix-rain">
        {columns.map(column => (
          <div
            key={column.id}
            className="matrix-column"
            style={{
              left: `${column.left}%`,
              animationDuration: `${column.duration}s`,
              animationDelay: `${column.delay}s`,
            }}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ opacity: 1 - i * 0.1 }}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" />
      
      {/* Cursor Trail */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailRefs.current[i] = el; }}
          className="cursor-trail"
        />
      ))}

      {/* Matrix Rain */}
      <MatrixRain />

      {/* Interactive Background Container */}
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
        {/* Interactive Dots */}
        {dots.map(dot => (
          <div
            key={dot.id}
            className={`interactive-dot ${dot.repelled ? 'repelled' : ''}`}
            style={{
              left: `${dot.x}px`,
              top: `${dot.y}px`,
            }}
          />
        ))}

        {/* Scroll-triggered Gears */}
        {gears.map(gear => (
          <div
            key={gear.id}
            className={`scroll-gear ${gear.visible ? 'visible' : ''}`}
            style={{
              left: `${gear.x}px`,
              top: `${gear.y}px`,
              transform: `rotate(${gear.rotation}deg)`,
              width: `${gear.size}px`,
              height: `${gear.size}px`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="rgba(0, 245, 255, 0.3)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="rgba(0, 245, 255, 0.2)"
                strokeWidth="1"
              />
              {Array.from({ length: gear.teeth }, (_, i) => (
                <rect
                  key={i}
                  x="48"
                  y="10"
                  width="4"
                  height="8"
                  fill="rgba(0, 245, 255, 0.4)"
                  transform={`rotate(${(i * 360) / gear.teeth} 50 50)`}
                />
              ))}
            </svg>
          </div>
        ))}

        {/* Circuit Lines */}
        <div className="circuit-line" style={{ top: '20%', left: '10%', width: '200px' }} />
        <div className="circuit-line" style={{ top: '60%', right: '15%', width: '150px' }} />
        <div className="circuit-line" style={{ bottom: '30%', left: '30%', width: '180px' }} />

        {/* Data Particles */}
        <div className="data-particle" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="data-particle" style={{ top: '60%', right: '15%', animationDelay: '1s' }} />
        <div className="data-particle" style={{ bottom: '30%', left: '30%', animationDelay: '2s' }} />
      </div>
    </>
  );
};

export default InteractiveBackground;