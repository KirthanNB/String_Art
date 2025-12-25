'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThreadCanvas from './ThreadCanvas';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const words = ["Memories", "Moments", "Stories", "Vision"];

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);
    const heroRef = useRef(null);
    const { isMobile, isHydrated } = useMediaQuery();

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const yTilt = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(yTilt, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        // Disable 3D tilt on mobile
        if (isMobile) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        yTilt.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        yTilt.set(0);
    };

    // Variants
    const letterContainerVariants = {
        hidden: { transition: { staggerChildren: 0.05 } },
        visible: { transition: { staggerChildren: 0.05 } },
        exit: { transition: { staggerChildren: 0.03 } }
    };

    const letterVariants = {
        hidden: { y: "100%", opacity: 0, rotateX: -90 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: { type: "spring", stiffness: 150, damping: 15 }
        },
        exit: { y: "-100%", opacity: 0, transition: { duration: 0.2 } }
    };

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <div className="min-h-screen bg-orange-50 font-sans text-slate-900">
            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
            .font-display { font-family: 'Playfair Display', serif; }
            .text-navy-900 { color: #0f172a; }
            .bg-cream-50 { background-color: #fff7ed; }
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .translate-z-10 { transform: translateZ(10px); }
            .translate-z-20 { transform: translateZ(20px); }
          `}</style>

            <section
                id="home"
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream-50 perspective-1000 pb-20 md:pb-0"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <ThreadCanvas />

                <motion.div
                    style={{
                        opacity,
                        y,
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="container mx-auto px-4 relative z-10"
                >
                    <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center transform-style-3d">

                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-navy-900 mb-8 transform-style-3d">
                            <span className="block font-light italic opacity-90 mb-2 translate-z-10">Weaving your</span>

                            <div className="relative inline-flex flex-col items-center justify-center h-[1.3em] overflow-visible min-w-[300px] translate-z-20">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={words[wordIndex]}
                                        variants={letterContainerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex relative z-10"
                                    >
                                        {words[wordIndex].split("").map((char, index) => (
                                            <motion.span
                                                key={index}
                                                variants={letterVariants}
                                                className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-teal-600 to-pink-600 font-semibold"
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-8 pointer-events-none">
                                    <AnimatePresence mode="wait">
                                        <motion.svg
                                            key={words[wordIndex]}
                                            viewBox="0 0 300 30"
                                            className="w-full h-full overflow-visible"
                                        >
                                            <motion.path
                                                d="M0,15 Q75,5 150,15 T300,15"
                                                fill="none"
                                                stroke="url(#gradient-line)"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                variants={lineVariants}
                                                initial="hidden"
                                                animate="visible"
                                            />
                                            <defs>
                                                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#0d9488" />
                                                    <stop offset="100%" stopColor="#db2777" />
                                                </linearGradient>
                                            </defs>
                                        </motion.svg>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <span className="block font-light italic mt-2 opacity-90 translate-z-10">into timeless art.</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-base md:text-lg lg:text-xl text-slate-600 mb-10 md:mb-10 max-w-2xl px-4 translate-z-10"
                        >
                            Handcrafted string art portraits made to order.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 sm:px-0 translate-z-20 mb-8 sm:mb-0">
                            {/* Luxurious Primary Button */}
                            <Link
                                href="/#contact"
                                className="group relative px-8 py-4 bg-navy-900 text-white rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(191,149,63,0.5)] hover:scale-105 min-h-[56px] flex items-center justify-center"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                <span className="relative z-10 flex items-center gap-2 group-hover:text-navy-900 transition-colors duration-300">
                                    <span>Order Custom Piece</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>

                            {/* Elegant Secondary Button */}
                            <Link
                                href="/#gallery"
                                className="group relative px-8 py-4 bg-white text-navy-900 border border-[#bf953f]/30 rounded-full font-medium hover:border-[#bf953f] hover:bg-[#fffbf0] transition-all duration-300 min-h-[56px] flex items-center justify-center hover:shadow-lg"
                            >
                                <span className="flex items-center gap-2">
                                    View Gallery
                                    <svg className="w-5 h-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </Link>
                        </div>

                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="absolute bottom-12 md:bottom-2 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
                >
                    {isMobile ? (
                        // Mobile: Chevrons
                        <div
                            className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
                            onClick={() => window.scrollBy({ top: window.innerHeight * 0.5, behavior: 'smooth' })}
                        >
                            <span className="text-xs uppercase tracking-[0.2em] text-navy-900/60 font-medium">
                                Explore
                            </span>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-navy-900/40"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                        </div>
                    ) : (
                        // // Desktop: Mouse
                        // <div className="flex flex-col items-center gap-3">
                        //     <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-navy-900/60 font-medium">
                        //         Scroll to Explore
                        //     </span>
                        //     <div className="w-[30px] h-[50px] rounded-full border-2 border-navy-900/30 flex justify-center p-2 relative bg-white/10 backdrop-blur-sm">
                        //         <motion.div
                        //             animate={{
                        //                 y: [0, 12, 0],
                        //                 opacity: [1, 0, 0] // Fade out as it scrolls down
                        //             }}
                        //             transition={{
                        //                 duration: 1.5,
                        //                 repeat: Infinity,
                        //                 repeatDelay: 0.5
                        //             }}
                        //             className="w-1.5 h-1.5 rounded-full bg-navy-900 mb-1"
                        //         />
                        //     </div>
                        // </div>
                        <div></div>
                    )}
                </motion.div>

            </section>
        </div>
    );
}