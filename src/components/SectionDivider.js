'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * A thematic section divider that creates a smooth transition between sections.
 * Designed to look like a fluid wave or thread.
 * 
 * @param {string} fillColor - The distinct tailwind class for the fill color (e.g. "text-navy-900").
 * @param {boolean} flip - If true, flips the wave horizontally for variety.
 */
export default function SectionDivider({ fillColor = "text-navy-900", flip = false }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

    return (
        <div ref={ref} className={`absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none transform -translate-y-[99%] ${fillColor}`}>
            <svg
                className={`relative block w-[calc(100%+1.3px)] h-[80px] sm:h-[120px] md:h-[160px] ${flip ? 'scale-x-[-1]' : ''}`}
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                {/* Main Fill Shape */}
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,2.92V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    fill="currentColor"
                ></path>

                {/* "Thread" Accent Line - Animated Parallax */}
                <motion.path
                    style={{ translateX: x }}
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,2.92"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}
