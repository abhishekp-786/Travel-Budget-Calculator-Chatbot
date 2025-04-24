import React, { useEffect, useState } from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle updates for performance
      if (Math.random() > 0.1) return;
      
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Generate background gradient based on mouse position
  const backgroundStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                 #e0f7fa 0%, 
                 #e8f5e9 50%, 
                 #f9fbe7 100%)`,
    transition: 'background 1s ease',
  };
  
  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Decorative animated elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-teal-300 opacity-20"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-1">{children}</div>
      
      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-15px) translateX(15px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;