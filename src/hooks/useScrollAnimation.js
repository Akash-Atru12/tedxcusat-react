import { useEffect, useRef } from 'react';

const animationMap = {
  'fade-in-up': 'fade-out-up',
  'fade-in-down': 'fade-out-down',
  'fade-in-left': 'fade-out-left',
  'fade-in-right': 'fade-out-right',
  'slide-in-up': 'slide-out-up',
  'slide-in-down': 'slide-out-down',
  'slide-in-left': 'slide-out-left',
  'slide-in-right': 'slide-out-right',
  'zoom-in': 'zoom-out',
  'scale-up': 'scale-down'
};

export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);
  const entryAnimationClass = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    once: true,
    exitAnimation: true,
    ...options
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Store the original animation classes
    if (!entryAnimationClass.current) {
      const classList = Array.from(element.classList);
      const animClass = classList.find(cls => animationMap.hasOwnProperty(cls));
      entryAnimationClass.current = animClass;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is entering viewport
          const entryClass = entryAnimationClass.current;
          if (entryClass) {
            entry.target.classList.remove(...Object.values(animationMap));
            entry.target.classList.add(entryClass);
          } else {
            entry.target.classList.add('animate-on-scroll');
          }
          
          if (defaultOptions.once && !hasAnimated.current) {
            hasAnimated.current = true;
            observer.unobserve(entry.target);
          }
        } else if (!entry.isIntersecting && defaultOptions.exitAnimation && !defaultOptions.once) {
          // Element is leaving viewport - apply exit animation
          const entryClass = entryAnimationClass.current;
          const exitClass = entryClass ? animationMap[entryClass] : null;
          
          if (exitClass) {
            entry.target.classList.remove(entryClass, 'animate-on-scroll');
            entry.target.classList.add(exitClass);
          }
        }
      });
    }, {
      threshold: defaultOptions.threshold,
      rootMargin: defaultOptions.rootMargin
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [defaultOptions]);

  return elementRef;
};
