'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function StringThreadBackground() {
    const containerRef = useRef(null);
    const [svgHeight, setSvgHeight] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setSvgHeight(document.body.scrollHeight);
                setWindowWidth(window.innerWidth);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        // Update on mutation to handle dynamic content loading
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(document.body);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            observer.disconnect();
        };
    }, []);

    // Calculate path points based on window width and height
    // We want the thread to weave from left to right down the page
    const generatePath = (offset = 0) => {
        if (!svgHeight || !windowWidth) return "";

        const points = [];
        const sections = 10; // Number of weaves
        const sectionHeight = svgHeight / sections;
        const amplitude = windowWidth * 0.4; // Width of the weave
        const center = windowWidth / 2;

        points.push(`M ${center + offset} 0`);

        for (let i = 1; i <= sections; i++) {
            const y = i * sectionHeight;
            const x = center + Math.sin(i * 0.8) * amplitude + offset;
            // Use cubic bezier for smooth curves
            const prevY = (i - 1) * sectionHeight;
            const prevX = center + Math.sin((i - 1) * 0.8) * amplitude + offset;

            const cp1x = prevX;
            const cp1y = prevY + sectionHeight * 0.5;
            const cp2x = x;
            const cp2y = y - sectionHeight * 0.5;

            points.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`);
        }

        return points.join(" ");
    };

    const path1 = generatePath(-50);
    const path2 = generatePath(50);
    const path3 = generatePath(0);

    const draw1 = useTransform(smoothProgress, [0, 1], [0, 1]);
    const draw2 = useTransform(smoothProgress, [0, 1], [0, 0.8]);
    const draw3 = useTransform(smoothProgress, [0, 1], [0, 0.9]);

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
            style={{ height: '100%' }}
        >
            <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                style={{ height: svgHeight }}
            >
                <defs>
                    <linearGradient id="threadGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00B8A9" />
                        <stop offset="50%" stopColor="#E91E63" />
                        <stop offset="100%" stopColor="#FF6B35" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Thread 1 */}
                <motion.path
                    d={path1}
                    fill="none"
                    stroke="url(#threadGradient1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    style={{ pathLength: draw1, opacity: 1 }}
                    className="will-change-transform"
                />

                {/* Thread 2 - Faint Echo */}
                <motion.path
                    d={path2}
                    fill="none"
                    stroke="#FFD23F"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                    initial={{ pathLength: 0 }}
                    style={{ pathLength: draw2 }}
                    className="will-change-transform"
                />

                {/* Thread 3 - Center Guide */}
                <motion.path
                    d={path3}
                    fill="none"
                    stroke="#E91E63"
                    strokeWidth="2"
                    strokeOpacity="0.2"
                    strokeDasharray="10 20"
                    initial={{ pathLength: 0 }}
                    style={{ pathLength: draw3 }}
                    className="will-change-transform"
                />
            </svg>
        </div>
    );
}
