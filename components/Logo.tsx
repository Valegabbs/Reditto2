import React, { useState, useEffect } from 'react';

export const Logo: React.FC<{ className?: string; onClick?: () => void; src?: string }> = ({ className, onClick, src }) => {
  const [currentSrc, setCurrentSrc] = useState(src || "https://lh3.googleusercontent.com/d/1KAfFuc_-iWpM2rW73ugtDo087Ssu7mR1");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (src && src !== currentSrc) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentSrc(src);
        setIsTransitioning(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [src, currentSrc]);

  return (
    <img 
      src={currentSrc} 
      alt="Donome Logo" 
      className={`${className} ${onClick ? 'cursor-pointer' : ''} transition-opacity duration-200 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      onClick={onClick}
      referrerPolicy="no-referrer"
    />
  );
};

export default Logo;