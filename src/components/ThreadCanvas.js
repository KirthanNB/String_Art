'use client';

import { useEffect, useRef, useState } from 'react';

export default function ThreadCanvas() {
    const canvasRef = useRef(null);
    const threadsRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
    const animationRef = useRef(null);
    const inactivityTimerRef = useRef(null);
    const breathingRef = useRef({ active: false, time: 0 });
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Simple Seeded Random for Deterministic Threads
        // Linear Congruential Generator (LCG)
        let seed = 12345;
        const random = () => {
            seed = (seed * 1664525 + 1013904223) % 4294967296;
            return seed / 4294967296;
        };

        // Device detection for thread count optimization
        const getThreadCount = () => {
            const isMobileDevice = width < 768;
            const isTablet = width >= 768 && width < 1024;

            // Reduced thread count for mobile performance
            if (isMobileDevice) return 15; // Further reduced from 18
            if (isTablet) return 60; // Reduced from 80
            return 100; // Reduced from 150
        };

        // Initialize canvas size
        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            // Reset seed for consistency on resize (optional, but keeps it stable)
            seed = 12345;
            initThreads();
        };

        // Thread colors from brand palette
        const threadColors = [
            'rgba(0, 184, 169, 0.15)',      // Teal
            'rgba(233, 30, 99, 0.12)',      // Pink
            'rgba(255, 107, 53, 0.12)',     // Orange
            'rgba(26, 35, 50, 0.08)',       // Navy
        ];

        // Generate a random point on the canvas edge
        const getEdgePoint = () => {
            const edge = Math.floor(random() * 4); // 0: Top, 1: Right, 2: Bottom, 3: Left
            switch (edge) {
                case 0: return { x: random() * width, y: -50 }; // Top
                case 1: return { x: width + 50, y: random() * height }; // Right
                case 2: return { x: random() * width, y: height + 50 }; // Bottom
                case 3: return { x: -50, y: random() * height }; // Left
                default: return { x: 0, y: 0 };
            }
        };

        // Initialize threads with edge-to-edge flow
        const initThreads = () => {
            const count = getThreadCount();
            threadsRef.current = [];

            for (let i = 0; i < count; i++) {
                // Start from one edge
                const start = getEdgePoint();

                // End at a different edge (ensure it crosses the screen somewhat)
                let end = getEdgePoint();
                // Simple check to prevent tiny corner clips (e.g. Top to Top)
                let attempts = 0;
                while ((Math.abs(start.x - end.x) < width * 0.3 && Math.abs(start.y - end.y) < height * 0.3) && attempts < 5) {
                    end = getEdgePoint();
                    attempts++;
                }

                // Midpoint for initial control point
                const midX = (start.x + end.x) / 2;
                const midY = (start.y + end.y) / 2;

                threadsRef.current.push({
                    // Fixed Endpoints
                    x1: start.x, y1: start.y,
                    x2: end.x, y2: end.y,
                    // Dynamic Control Point (starts at midpoint)
                    cx: midX, cy: midY,
                    // Velocity of control point
                    vx: 0, vy: 0,
                    // Physics properties - GUITAR STRING FEEL
                    tension: 0.01 + random() * 0.02, // High tension for snap
                    damping: 0.92, // Low damping for vibration
                    // Visual - Thicker threads on mobile for visibility
                    color: threadColors[Math.floor(random() * threadColors.length)],
                    thickness: width < 768 ? 1.5 + random() * 0.5 : 0.5 + random() * 0.5,
                });
            }
        };

        // Mouse tracking with inactivity detection (desktop only)
        const handleMouseMove = (e) => {
            // Skip mouse tracking on mobile for performance
            if (width < 768) return;

            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.isMoving = true;

            // Reset breathing when user moves
            breathingRef.current.active = false;

            // Clear and restart inactivity timer
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = setTimeout(() => {
                mouseRef.current.isMoving = false;
                breathingRef.current.active = true;
                breathingRef.current.time = 0;
            }, 2000);
        };

        // Main animation loop
        const animate = () => {
            if (!canvasRef.current) return; // Cleanup check

            // Clear canvas with slight trail effect
            ctx.fillStyle = 'rgba(248, 245, 242, 0.4)'; // Clearer trails for sharp vibration
            ctx.fillRect(0, 0, width, height);

            const threads = threadsRef.current;
            const mouse = mouseRef.current;
            const breathing = breathingRef.current;

            // Update breathing time
            if (breathing.active) {
                breathing.time += 0.02;
            }

            // Render and update each thread
            threads.forEach((thread, index) => {
                // Calculate rest position (midpoint of fixed ends)
                const midX = (thread.x1 + thread.x2) / 2;
                const midY = (thread.y1 + thread.y2) / 2;

                let targetCX = midX;
                let targetCY = midY;

                // Mouse interaction
                if (mouse.isMoving) {
                    // Calculate distance from mouse to the CONTROL POINT (approximate interaction)
                    const dist = Math.hypot(thread.cx - mouse.x, thread.cy - mouse.y);

                    const maxDistance = 200; // Interaction radius
                    const forceStrength = 100; // Pluck strength

                    if (dist < maxDistance) {
                        const force = (1 - dist / maxDistance) * forceStrength;
                        const angle = Math.atan2(mouse.y - thread.cy, mouse.x - thread.cx);

                        // Push control point away from mouse (plucking effect)
                        targetCX -= Math.cos(angle) * force;
                        targetCY -= Math.sin(angle) * force;
                    }
                }

                // Breathing animation
                if (breathing.active) {
                    const breathWave = Math.sin(breathing.time + index * 0.1) * 20; // Amplitude of breath
                    // Simple offset for "breathing" chest feel
                    targetCX += breathWave;
                    targetCY += breathWave * 0.5;
                }

                // Apply spring physics to Control Point
                const dx = targetCX - thread.cx;
                const dy = targetCY - thread.cy;

                thread.vx += dx * thread.tension;
                thread.vy += dy * thread.tension;

                thread.vx *= thread.damping;
                thread.vy *= thread.damping;

                thread.cx += thread.vx;
                thread.cy += thread.vy;

                // Render thread as Quadratic Curve
                ctx.strokeStyle = thread.color;
                ctx.lineWidth = thread.thickness;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(thread.x1, thread.y1);
                ctx.quadraticCurveTo(thread.cx, thread.cy, thread.x2, thread.y2);
                ctx.stroke();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();

        // Enable breathing animation by default on mobile
        if (width < 768) {
            breathingRef.current.active = true;
            breathingRef.current.time = 0;
        }

        // Event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);

        // Start animation with low priority to allow LCP to finish first
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                animationRef.current = requestAnimationFrame(animate);
            });
        } else {
            setTimeout(() => {
                animationRef.current = requestAnimationFrame(animate);
            }, 100);
        }

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            clearTimeout(inactivityTimerRef.current);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isMobile]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
