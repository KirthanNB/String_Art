'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * A 3D parallax string art divider that creates depth between sections.
 * Features multiple layers of "threads" moving at different speeds.
 * 
 * @param {string} position - "top" or "bottom" (defaults to top)
 */
export default function ThreadParallaxDivider({ position = "top" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax layers - different speeds create 3D depth
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

    const isTop = position === "top";

    return (
        <div
            ref={ref}
            className={`absolute ${isTop ? '-top-32 sm:-top-48' : '-bottom-32 sm:-bottom-48'} left-0 w-full h-48 sm:h-72 overflow-hidden pointer-events-none z-20`}
            style={{ transform: isTop ? 'none' : 'rotate(180deg)' }}
        >
            {/* Layer 1: Background threads (Slow, faint) */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-20">
                <svg className="w-full h-full text-current" viewBox="0 0 1200 300" preserveAspectRatio="none">
                    <path d="M0,0 Q600,300 1200,0" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,50 Q600,350 1200,50" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M0,100 Q600,400 1200,100" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* Cross threads */}
                    <line x1="0" y1="0" x2="1200" y2="300" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="1200" y1="0" x2="0" y2="300" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </motion.div>

            {/* Layer 2: Midground threads (Medium speed) */}
            <motion.div style={{ y: y2, rotate: rotate }} className="absolute inset-0 opacity-40">
                <svg className="w-full h-full text-current" viewBox="0 0 1200 300" preserveAspectRatio="none">
                    {/* Geometric Web */}
                    <path d="M0,300 L200,0 L400,300 L600,0 L800,300 L1000,0 L1200,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </motion.div>

            {/* Layer 3: Foreground threads (Fast, sharp, distinct) */}
            <motion.div style={{ y: y3 }} className="absolute inset-0 opacity-80">
                <svg className="w-full h-full text-current" viewBox="0 0 1200 300" preserveAspectRatio="none">
                    {/* Main Taut String */}
                    <path d="M0,150 C300,100 900,200 1200,150" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                </svg>
            </motion.div>

            {/* Gradient Fade to blend smoothly */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isTop ? 'from-transparent to-current' : 'from-current to-transparent'} opacity-10`}></div>
        </div>
    );
}
