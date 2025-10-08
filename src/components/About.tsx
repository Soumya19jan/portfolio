import React, { useEffect, useRef, useState } from 'react';
import { Brain, Cpu, Zap, Target } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '10+', label: 'Projects Completed', icon: Target },
    { number: '7+', label: 'Prize Won', icon: Cpu },
    { number: '25+', label: 'Certifiacations', icon: Brain },
    { number: '2+', label: 'Industrial Internship', icon: Zap },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40">
          <svg viewBox="0 0 100 100" className="gear-animation">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            {[...Array(16)].map((_, i) => (
              <rect
                key={i}
                x="49"
                y="5"
                width="2"
                height="8"
                fill="currentColor"
                className="text-cyan-400"
                transform={`rotate(${i * 22.5} 50 50)`}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
              About <span className="text-cyan-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className={`space-y-6 ${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate <span className="text-cyan-400 font-semibold">Robotics Engineer</span> with a foundation in hardware and embedded systems, seeking an
opportunity to learn, explore, and grow in the field of robotics through hands-on experience in real-
world projects. Eager to enhance my skills in hardware design, sensor integration, and system control
under expert guidance.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey began with a fascination for how machines can mimic human behavior and solve complex problems. 
                Today, I specialize in creating <span className="text-orange-400 font-semibold">cutting-edge robotic solutions</span> 
                that bridge the gap between theoretical AI and practical applications.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white font-orbitron">Core Expertise:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Autonomous Navigation',
                    'Computer Vition',
                    'Embedded System',
                    'Control Systems',
                    'Sensor Fusion',
                    'IOT',
                    'Industrial Automation',
                    'Machine Learning'
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Visual */}
            <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105 text-center"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold font-orbitron text-white mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Element */}
              <div className="mt-8 relative">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Innovation Focus</h4>
                      <p className="text-gray-300 text-sm">
                        Transforming ideas into intelligent robotic solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;