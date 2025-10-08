import React, { useEffect, useRef, useState } from 'react';
import { Code, Wrench, Brain, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with delay
          setTimeout(() => {
            setAnimatedSkills([90, 85, 95, 88, 82, 92, 87, 89]);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      color: 'from-cyan-400 to-blue-500',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'C++', level: 85 }
      ]
    },
    {
      title: 'Robotics',
      icon: Wrench,
      color: 'from-orange-400 to-red-500',
      skills: [
        { name: 'ROS/ROS2', level: 95 },
        { name: 'Control Systems', level: 88 }
      ]
    },
    {
      title: 'AI/ML',
      icon: Brain,
      color: 'from-purple-400 to-pink-500',
      skills: [
        { name: 'TensorFlow', level: 82 },
        { name: 'Computer Vision', level: 92 }
      ]
    },
    {
      title: 'Hardware',
      icon: Zap,
      color: 'from-green-400 to-teal-500',
      skills: [
        { name: 'Embedded Systems', level: 87 },
        { name: 'PCB Design', level: 89 }
      ]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Gears */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-48 h-48">
          <svg viewBox="0 0 100 100" className="gear-animation">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            {[...Array(12)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="5"
                width="4"
                height="12"
                fill="currentColor"
                className="text-cyan-400"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32">
          <svg viewBox="0 0 100 100" className="gear-animation-reverse">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" className="text-orange-400" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="10"
                width="4"
                height="10"
                fill="currentColor"
                className="text-orange-400"
                transform={`rotate(${i * 45} 50 50)`}
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
              Technical <span className="text-cyan-400">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              A comprehensive toolkit for building the future of robotics and automation
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className={`${isVisible ? 'slide-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.2 + categoryIndex * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105 h-full">
                    {/* Category Header */}
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white font-orbitron">{category.title}</h3>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => {
                        const globalIndex = categoryIndex * 2 + skillIndex;
                        const animatedLevel = animatedSkills[globalIndex] || 0;
                        
                        return (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 font-medium">{skill.name}</span>
                              <span className="text-white font-bold text-sm">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                                style={{ width: `${animatedLevel}%` }}
                              >
                                <div className="h-full bg-white/20 animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Skills Cloud */}
          <div className={`mt-16 text-center ${isVisible ? 'slide-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold text-white font-orbitron mb-8">Additional Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'MATLAB', 'Simulink', 'Docker', 'Kubernetes', 'AWS', 'Linux',
                'Git', 'SLAM', 'Gazebo', 'OpenCV', 'PyTorch', 'Arduino',
                'Raspberry Pi', 'SolidWorks', 'Fusion 360', 'LabVIEW'
              ].map((tech, index) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-full border border-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  style={{ animationDelay: `${0.8 + index * 0.05}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;