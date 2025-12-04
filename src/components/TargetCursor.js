import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const cornersRef = useRef([]);
  const spinTl = useRef(null);
  const dotRef = useRef(null);
  const isActiveRef = useRef(false);
  const targetCornerPositionsRef = useRef(null);
  const tickerFnRef = useRef(null);
  const activeStrengthRef = useRef(0);
  
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return true;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(
    () => ({
      borderWidth: 3,
      cornerSize: 12
    }),
    []
  );

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    let animationFrame = null;
    const originalCursor = document.body.style.cursor;
    
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cleanup = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (spinTl.current) {
        spinTl.current.kill();
        spinTl.current = null;
      }
      document.body.style.cursor = originalCursor;
      gsap.ticker.remove(tickerFnRef.current);
    };

    try {
      const cursor = cursorRef.current;
      cornersRef.current = cursor.querySelectorAll('.target-cursor-corner');
      
      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });

      const createSpinTimeline = () => {
        if (spinTl.current) {
          spinTl.current.kill();
        }
        spinTl.current = gsap
          .timeline({ repeat: -1 })
          .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
      };

      createSpinTimeline();

      const tickerFn = () => {
        if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current.length) {
          return;
        }
        const strength = activeStrengthRef.current;
        if (strength === 0) return;
        const cursorX = gsap.getProperty(cursorRef.current, 'x');
        const cursorY = gsap.getProperty(cursorRef.current, 'y');
        
        cornersRef.current.forEach((corner, i) => {
          if (!corner) return;
          const currentX = gsap.getProperty(corner, 'x');
          const currentY = gsap.getProperty(corner, 'y');
          const targetX = targetCornerPositionsRef.current[i].x - cursorX;
          const targetY = targetCornerPositionsRef.current[i].y - cursorY;
          const finalX = currentX + (targetX - currentX) * strength;
          const finalY = currentY + (targetY - currentY) * strength;
          const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
          
          gsap.to(corner, {
            x: finalX,
            y: finalY,
            duration: duration,
            ease: duration === 0 ? 'none' : 'power1.out',
            overwrite: 'auto'
          });
        });
      };

      tickerFnRef.current = tickerFn;

      const moveHandler = e => moveCursor(e.clientX, e.clientY);
      window.addEventListener('mousemove', moveHandler);

      const enterHandler = e => {
        const directTarget = e.target;
        let current = directTarget;
        let target = null;
        
        while (current && current !== document.body) {
          if (current.matches && current.matches(targetSelector)) {
            target = current;
            break;
          }
          current = current.parentElement;
        }
        
        if (!target || !cursorRef.current || !cornersRef.current.length) return;
        
        const rect = target.getBoundingClientRect();
        const { borderWidth, cornerSize } = constants;
        const cursorX = gsap.getProperty(cursorRef.current, 'x');
        const cursorY = gsap.getProperty(cursorRef.current, 'y');
        
        targetCornerPositionsRef.current = [
          { x: rect.left - borderWidth, y: rect.top - borderWidth },
          { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
          { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
          { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
        ];

        gsap.to(activeStrengthRef, { current: 1, duration: hoverDuration, ease: 'power2.out' });
        isActiveRef.current = true;
        gsap.ticker.add(tickerFnRef.current);
      };

      document.addEventListener('mouseover', enterHandler, true);

      const leaveHandler = () => {
        gsap.ticker.remove(tickerFnRef.current);
        gsap.to(activeStrengthRef, { current: 0, duration: hoverDuration, ease: 'power2.out' });
        isActiveRef.current = false;
        targetCornerPositionsRef.current = null;
      };

      document.addEventListener('mouseout', leaveHandler, true);

      const scrollHandler = () => {
        if (!cursorRef.current) return;
        const mouseX = gsap.getProperty(cursorRef.current, 'x');
        const mouseY = gsap.getProperty(cursorRef.current, 'y');
        moveCursor(mouseX, mouseY);
      };

      window.addEventListener('scroll', scrollHandler, { passive: true });

      return () => {
        cleanup();
        window.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseover', enterHandler, true);
        document.removeEventListener('mouseout', leaveHandler, true);
        window.removeEventListener('scroll', scrollHandler);
      };
    } catch (error) {
      console.error('Ошибка инициализации кастомного курсора:', error);
      cleanup();
    }
  }, [targetSelector, spinDuration, moveCursor, constants, hideDefaultCursor, isMobile, hoverDuration, parallaxOn]);

  if (isMobile || typeof window === 'undefined') {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default TargetCursor;