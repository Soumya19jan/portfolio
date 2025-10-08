import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, InstagramIcon } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'soumyadeepmaity29@gmail.com',
      href: 'mailto:soumyadeepmaity29@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7003521394',
      href: 'tel:=+917003521394'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, West Bengal, India',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'Github' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-1/4 w-36 h-36">
          <svg viewBox="0 0 100 100" className="gear-animation">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
            {[...Array(10)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="10"
                width="4"
                height="12"
                fill="currentColor"
                className="text-cyan-400"
                transform={`rotate(${i * 36} 50 50)`}
              />
            ))}
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/4 w-28 h-28">
          <svg viewBox="0 0 100 100" className="gear-animation-reverse">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-orange-400" />
            {[...Array(8)].map((_, i) => (
              <rect
                key={i}
                x="48"
                y="15"
                width="4"
                height="8"
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
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Ready to discuss your next robotics project or collaboration opportunity? Let's build the future together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white font-orbitron mb-6">Let's Connect</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    I'm always excited to discuss innovative robotics projects, AI applications, 
                    and opportunities to push the boundaries of automation technology.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105 group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 uppercase tracking-wide">{info.label}</p>
                          <p className="text-white font-medium">{info.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-110"
                          aria-label={social.label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${isVisible ? 'slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                    placeholder="Project Discussion"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or ideas..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 box-glow"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;