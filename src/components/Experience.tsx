import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      title: 'Senior Robotics Engineer',
      company: 'TechCorp Robotics',
      period: '2021 - Present',
      location: 'San Francisco, CA',
      description: 'Leading development of autonomous navigation systems for industrial robots. Implemented computer vision algorithms that improved accuracy by 40%.',
      achievements: [
        'Developed ML-powered quality control system',
        'Led team of 8 engineers on multi-million dollar project',
        'Filed 5 patents in robotic manipulation'
      ]
    },
    {
      title: 'Robotics Software Engineer',
      company: 'Innovation Labs',
      period: '2019 - 2021',
      location: 'Boston, MA',
      description: 'Designed and implemented control systems for collaborative robots in manufacturing environments.',
      achievements: [
        'Reduced production downtime by 60%',
        'Created real-time path planning algorithms',
        'Integrated AI models for predictive maintenance'
      ]
    },
    {
      title: 'Junior Robotics Engineer',
      company: 'StartupBot Inc.',
      period: '2017 - 2019',
      location: 'Austin, TX',
      description: 'Developed embedded systems and sensor integration for autonomous delivery robots.',
      achievements: [
        'Built complete sensor fusion pipeline',
        'Optimized battery life by 35%',
        'Contributed to 3 successful product launches'
      ]
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 w-32 h-32">
          <svg viewBox="0 0 100 100" className="gear-animation-reverse">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400" />
            {[...Array(10)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="10"
                width="4"
                height="12"
                fill="currentColor"
                className="text-orange-400"
                transform={`rotate(${i * 36} 50 50)`}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
              Work <span className="text-cyan-400">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 transform md:-translate-x-1/2"></div>

            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform md:-translate-x-1/2 pulse-glow"></div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-1/2'}`}>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white font-orbitron mb-1">{exp.title}</h3>
                        <h4 className="text-lg text-cyan-400 font-semibold">{exp.company}</h4>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center text-orange-400 text-sm mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-white uppercase tracking-wide">Key Achievements:</h5>
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;