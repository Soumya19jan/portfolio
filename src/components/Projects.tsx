import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Play, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

  const projects = [
    {
      title: 'Autonomous Warehouse Robot',
      description: 'AI-powered navigation system with computer vision for inventory management and automated sorting.',
      image: 'https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'ROS2', 'OpenCV', 'TensorFlow'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      title: 'Robotic Arm Control System',
      description: 'Real-time control interface with haptic feedback for precision manufacturing applications.',
      image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['C++', 'Control Theory', 'Embedded Systems'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      title: 'Drone Swarm Coordination',
      description: 'Multi-agent system for coordinated autonomous drone operations with distributed decision making.',
      image: 'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'Multi-Agent Systems', 'ROS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      title: 'Smart Factory IoT System',
      description: 'Industrial IoT platform for predictive maintenance and real-time monitoring of robotic systems.',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['IoT', 'Machine Learning', 'Cloud Computing'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 right-10 w-40 h-40">
          <svg viewBox="0 0 100 100" className="gear-animation">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400" />
            {[...Array(12)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="5"
                width="4"
                height="12"
                fill="currentColor"
                className="text-purple-400"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>
        <div className="absolute bottom-20 left-10 w-24 h-24">
          <svg viewBox="0 0 100 100" className="gear-animation-reverse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="15"
                width="4"
                height="8"
                fill="currentColor"
                className="text-cyan-400"
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
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Showcasing innovative robotics solutions that push the boundaries of automation and AI
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {projects.filter(p => p.featured).map((project, index) => (
              <div
                key={project.title}
                className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  
                  {/* Overlay on Hover */}
                  <div className={`absolute inset-0 bg-cyan-500/20 flex items-center justify-center space-x-4 transition-opacity duration-300 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                    <a href={project.liveUrl} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300">
                      <Play className="w-6 h-6" />
                    </a>
                    <a href={project.githubUrl} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href={project.liveUrl} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300">
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white font-orbitron mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center space-x-4">
                    <a href={project.liveUrl} className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                      <span>View Demo</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    <a href={project.githubUrl} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300">
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.filter(p => !p.featured).map((project, index) => (
              <div
                key={project.title}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105 ${isVisible ? 'slide-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white font-orbitron mb-1">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4">
                  <a href={project.githubUrl} className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors duration-300">
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a href={project.liveUrl} className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;