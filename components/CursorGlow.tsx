'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A soft light that trails the pointer on desktop. Purely decorative: it is
 * skipped on touch devices, on coarse pointers and under reduced motion.
 */
export default function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 140, damping: 24, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 140, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia('(pointer: fine)');
    if (!fine.matches) return;

    setEnabled(true);
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[60] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2
                 rounded-full opacity-[0.28] mix-blend-soft-light lg:block"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.55)_0%,rgba(201,162,39,0)_65%)]" />
    </motion.div>
  );
}
