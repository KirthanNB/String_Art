'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * A premium "Golden Thread" divider that creates a cinematic transition.
 * Features metallic gold gradients and complex string-art style looping paths.
 * 
 * @param {string} position - "top" or "bottom" (defaults to top)
 * @param {boolean} flip - Flips the SVG horizontally for variation
 */
export default function GoldenThreadDivider({ position = "top", flip = false }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax layers for 3D depth - INCREASED RANGE for dramatic flow
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]); // Background moves fast
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // Midground moves up
    const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); // Foreground moves moderate

    // Scale effect for the main thread to make it "pulse" slightly as you scroll
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);

    // Continuous flow animation config
    const flowAnimation = {
        strokeDashoffset: [0, -100],
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
        }
    };

    const isTop = position === "top";

    return (
        <div
            ref={ref}
            className={`absolute ${isTop ? '-top-24 sm:-top-32 md:-top-48' : '-bottom-24 sm:-bottom-32 md:-bottom-48'} left-0 w-full h-32 sm:h-48 md:h-64 overflow-hidden pointer-events-none z-30 will-change-transform`}
            style={{ transform: isTop ? (flip ? 'scaleX(-1)' : 'none') : `rotate(180deg) ${flip ? 'scaleX(-1)' : ''}` }}
        >
            {/* 
                Gradient Blend Layer:
                Fades from transparent to the current section's background color (set via text-color on parent).
                This eliminates the "straight line" hard cut between sections.
            */}

            <svg className="w-full h-full relative z-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <defs>
                    {/* Metallic Gold Gradient */}
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#bf953f" />
                        <stop offset="25%" stopColor="#fcf6ba" />
                        <stop offset="50%" stopColor="#b38728" />
                        <stop offset="75%" stopColor="#fbf5b7" />
                        <stop offset="100%" stopColor="#aa771c" />
                    </linearGradient>

                    {/* Darker Gold for Depth */}
                    <linearGradient id="gold-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8a6e2f" />
                        <stop offset="100%" stopColor="#4a3b19" />
                    </linearGradient>
                </defs>

                {/* Layer 1: Background Web (Faint, Darker) */}
                <motion.path
                    style={{ y: y1 }}
                    d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128"
                    fill="none"
                    stroke="url(#gold-dark)"
                    strokeWidth="1"
                    opacity="0.3"
                />
                <motion.path
                    style={{ y: y1 }}
                    d="M0,200C200,100,600,300,1440,150"
                    fill="none"
                    stroke="url(#gold-dark)"
                    strokeWidth="0.5"
                    opacity="0.2"
                />

                {/* Layer 2: Midground "Loom" Lines (String Art Style) */}
                <motion.path
                    style={{ y: y2 }}
                    d="M0,320L48,277.3C96,235,192,149,288,138.7C384,128,480,192,576,213.3C672,235,768,213,864,192C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96"
                    fill="none"
                    stroke="url(#gold-dark)"
                    strokeWidth="1.5"
                    strokeDasharray="8 8"
                    animate={{ strokeDashoffset: [0, -100] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    opacity="0.6"
                />

                {/* Layer 3: Main Golden Thread (Bright, Flowing, Foreground) */}
                <motion.path
                    style={{ y: y3, scale }}
                    d="M0,160L40,149.3C80,139,160,117,240,133.3C320,149,400,203,480,218.7C560,235,640,213,720,186.7C800,160,880,128,960,122.7C1040,117,1120,139,1200,154.7C1280,171,1360,181,1400,186.7L1440,192"
                    fill="none"
                    stroke="url(#gold-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="2000"
                    animate={{ strokeDashoffset: [0, 4000] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.3))"
                />

                {/* Secondary Bright Thread for "Double String" effect */}
                <motion.path
                    style={{ y: y3 }}
                    d="M0,180C140,280,500,0,1440,120"
                    fill="none"
                    stroke="url(#gold-gradient)"
                    strokeWidth="1"
                    opacity="0.8"
                    strokeDasharray="1000"
                    animate={{ strokeDashoffset: [0, -2000] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* Soft Glow overlay to enhance the "Golden" feel */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isTop ? 'from-transparent to-current' : 'from-current to-transparent'} opacity-5 mix-blend-overlay`}></div>
        </div>
    );
}
