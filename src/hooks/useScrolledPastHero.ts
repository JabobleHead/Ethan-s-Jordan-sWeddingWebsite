import { useEffect, useState } from 'react';

export function useScrolledPastHero(offset = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const update = () => {
      const threshold = window.innerHeight - offset;
      setScrolled(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [offset]);

  return scrolled;
}
