'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function GlobeGallery({ items = [], autoRotateSpeed = 0.5 }) {
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const rotationStart = useRef({ x: 0, y: 0 });
    const autoRotateRef = useRef(null);
    const lastInteractionTime = useRef(Date.now());

    // Auto-rotation effect
    useEffect(() => {
        const autoRotate = () => {
            const now = Date.now();
            const timeSinceInteraction = now - lastInteractionTime.current;

            // Resume auto-rotation 2 seconds after last interaction
            if (!isDragging && !isHovering && timeSinceInteraction > 2000) {
                setRotation(prev => ({
                    x: prev.x,
                    y: (prev.y + autoRotateSpeed) % 360
                }));
            }

            autoRotateRef.current = requestAnimationFrame(autoRotate);
        };

        autoRotateRef.current = requestAnimationFrame(autoRotate);

        return () => {
            if (autoRotateRef.current) {
                cancelAnimationFrame(autoRotateRef.current);
            }
        };
    }, [isDragging, isHovering, autoRotateSpeed]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        rotationStart.current = { ...rotation };
        lastInteractionTime.current = Date.now();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;

        setRotation({
            x: rotationStart.current.x + deltaY * 0.5,
            y: rotationStart.current.y + deltaX * 0.5
        });
        lastInteractionTime.current = Date.now();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        const touch = e.touches[0];
        dragStart.current = { x: touch.clientX, y: touch.clientY };
        rotationStart.current = { ...rotation };
        lastInteractionTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const deltaX = touch.clientX - dragStart.current.x;
        const deltaY = touch.clientY - dragStart.current.y;

        setRotation({
            x: rotationStart.current.x + deltaY * 0.5,
            y: rotationStart.current.y + deltaX * 0.5
        });
        lastInteractionTime.current = Date.now();
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
        lastInteractionTime.current = Date.now();
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, rotation]);

    // Calculate positions on sphere
    const getPositionOnSphere = (index, total) => {
        // Use Fibonacci spiral for even distribution on sphere
        const phi = Math.acos(1 - 2 * (index + 0.5) / total);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;

        const radius = 350; // sphere radius

        return {
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(phi) * Math.sin(theta),
            rotX: (phi * 180 / Math.PI) - 90,
            rotY: theta * 180 / Math.PI
        };
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] flex items-center justify-center"
            style={{ perspective: '1200px' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="relative cursor-grab active:cursor-grabbing"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    width: '700px',
                    height: '700px'
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {items.map((item, index) => {
                    const pos = getPositionOnSphere(index, items.length);

                    return (
                        <motion.div
                            key={index}
                            className="absolute"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: `
                                    translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)
                                    rotateY(${pos.rotY}deg)
                                    rotateX(${-pos.rotX}deg)
                                `,
                                left: '50%',
                                top: '50%',
                                marginLeft: '-100px',
                                marginTop: '-100px',
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                        >
                            <div className="w-[200px] h-[200px] bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-cream-100 hover:border-primary-teal transition-all duration-300 hover:scale-110">
                                <div className="relative w-full h-[140px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title || 'Gallery item'}
                                        fill
                                        className="object-cover"
                                        sizes="200px"
                                    />
                                </div>
                                <div className="p-3 bg-gradient-to-br from-white to-cream-50">
                                    <h3 className="text-sm font-bold text-navy-900 truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-navy-700 truncate">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Instruction hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering || isDragging ? 0 : 0.6 }}
                    className="text-sm text-navy-600 font-medium"
                >
                    Drag to explore • Auto-rotating globe
                </motion.p>
            </div>

            {/* Ambient glow effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary-teal/10 to-primary-pink/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
