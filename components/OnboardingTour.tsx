import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position: 'right' | 'left' | 'bottom' | 'top';
}

interface OnboardingTourProps {
  steps: TourStep[];
  isOpen: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, isOpen, onComplete, onSkip }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Find the target element
    const updatePosition = () => {
      const step = steps[currentStepIndex];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        // Skip step if element not found (e.g. mobile hidden sidebar)
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          onComplete();
        }
      }
    };

    // Small timeout to allow UI to settle/render
    const timer = setTimeout(updatePosition, 300);
    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
    };
  }, [currentStepIndex, isOpen, steps, onComplete]);

  if (!isOpen || !targetRect) return null;

  const step = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  // Calculate Tooltip Position
  const getTooltipStyle = () => {
    const spacing = 20;
    const tooltipWidth = 320; // approximate max width

    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'right':
        top = targetRect.top;
        left = targetRect.right + spacing;
        break;
      case 'left':
        top = targetRect.top;
        left = targetRect.left - tooltipWidth - spacing;
        break;
      case 'bottom':
        top = targetRect.bottom + spacing;
        left = targetRect.left;
        break;
      case 'top':
        top = targetRect.top - 200; // rough estimate
        left = targetRect.left;
        break;
      default: // default to bottom-ish center
        top = targetRect.bottom + spacing;
        left = targetRect.left;
    }

    // Boundary checks (basic)
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 10;
    if (top < 10) top = 10;

    return { top, left };
  };

  const { top, left } = getTooltipStyle();

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden">
      {/* SVG Overlay to create the "Spotlight" cutout effect */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500 ease-in-out">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect 
              x={targetRect.left - 10} 
              y={targetRect.top - 10} 
              width={targetRect.width + 20} 
              height={targetRect.height + 20} 
              rx="16" 
              fill="black" 
              className="transition-all duration-300"
            />
          </mask>
        </defs>
        <rect 
          x="0" y="0" width="100%" height="100%" 
          fill="rgba(0,0,0,0.7)" 
          mask="url(#spotlight-mask)" 
        />
        {/* Animated border around target */}
        <rect 
          x={targetRect.left - 10} 
          y={targetRect.top - 10} 
          width={targetRect.width + 20} 
          height={targetRect.height + 20} 
          rx="16"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="3"
          className="transition-all duration-300 animate-pulse"
        />
      </svg>

      {/* Tooltip Card */}
      <div 
        className="absolute w-[300px] md:w-[340px] bg-white dark:bg-brand-darkSurface p-6 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.3)] transition-all duration-500 ease-out border border-white/20 dark:border-brand-darkBorder"
        style={{ top, left }}
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/10 px-2 py-1 rounded-lg">
            Passo {currentStepIndex + 1} de {steps.length}
          </span>
          <button onClick={onSkip} className="text-gray-400 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-brand-black dark:text-white mb-2">
          {step.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
          {step.content}
        </p>

        <div className="flex items-center justify-between">
            <div className="flex gap-2">
                {currentStepIndex > 0 && (
                     <button 
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-brand-darkBg transition-colors"
                     >
                       <ChevronLeft size={20} />
                     </button>
                )}
            </div>

            <button 
                onClick={handleNext}
                className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blueHover text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
                {isLastStep ? 'Concluir' : 'Próximo'}
                {!isLastStep && <ChevronRight size={16} />}
            </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
