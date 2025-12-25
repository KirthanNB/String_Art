'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from 'framer-motion';

export default function ThreeDImageRing({
    images = [],
    width = 300,
    perspective = 2000,
    imageDistance = 500,
    initialRotation = 180,
    animationDuration = 1.5,
    staggerDelay = 0.1,
    hoverOpacity = 0.5,
    containerClassName = '',
    ringClassName = '',
    imageClassName = '',
    backgroundColor,
    draggable = true,
    mobileBreakpoint = 768,
    mobileScaleFactor = 0.8,
    inertiaPower = 0.8,
    inertiaTimeConstant = 300,
    inertiaVelocityMultiplier = 20,
    onItemClick,
    showPlayIcon = false,
}) {
    const containerRef = useRef(null);
    const ringRef = useRef(null);

    const rotationY = useMotionValue(initialRotation);
    const startX = useRef(0);
    const currentRotationY = useRef(initialRotation);
    const isDragging = useRef(false);
    const velocity = useRef(0);
    const hasEverInteracted = useRef(false);
    const autoRotateAnimationFrame = useRef(null);
    const inactivityTimer = useRef(null);
    const isAutoRotating = useRef(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const hasDragged = useRef(false);
    const touchStartTime = useRef(0);
    const DRAG_THRESHOLD = 10; // Increased for better mobile support

    const [currentScale, setCurrentScale] = useState(1);
    const [showImages, setShowImages] = useState(false);
    const [centerIndex, setCenterIndex] = useState(null);
    const [shouldAutoRotate, setShouldAutoRotate] = useState(true);

    const angle = useMemo(() => 360 / images.length, [images.length]);

    const getBgPos = (imageIndex, currentRot, scale) => {
        const scaledImageDistance = imageDistance * scale;
        const effectiveRotation = currentRot - 180 - imageIndex * angle;
        const parallaxOffset = ((effectiveRotation % 360 + 360) % 360) / 360;
        return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
    };

    useEffect(() => {
        const unsubscribe = rotationY.on('change', (latestRotation) => {
            currentRotationY.current = latestRotation;

            // Find center item
            const normalizedRotation = ((latestRotation % 360) + 360) % 360;
            const centerAngle = (180 - normalizedRotation + 360) % 360;
            const itemAngle = 360 / images.length;
            const center = Math.round(centerAngle / itemAngle) % images.length;
            setCenterIndex(center);
        });
        return () => unsubscribe();
    }, [rotationY, images.length]);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
            setCurrentScale(newScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [mobileBreakpoint, mobileScaleFactor]);

    useEffect(() => {
        setShowImages(true);
    }, []);

    // Auto-rotation effect
    useEffect(() => {
        if (!shouldAutoRotate || !showImages) return;

        const autoRotate = () => {
            if (!isDragging.current) {
                const newRotation = rotationY.get() + 0.3;
                rotationY.set(newRotation);
                currentRotationY.current = newRotation;
            }
            autoRotateAnimationFrame.current = requestAnimationFrame(autoRotate);
        };

        isAutoRotating.current = true;
        autoRotateAnimationFrame.current = requestAnimationFrame(autoRotate);

        return () => {
            if (autoRotateAnimationFrame.current) {
                cancelAnimationFrame(autoRotateAnimationFrame.current);
            }
        };
    }, [shouldAutoRotate, showImages, rotationY]);

    const handleDragStart = (event) => {
        if (!draggable) return;

        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

        dragStartPos.current = { x: clientX, y: clientY };
        hasDragged.current = false;
        touchStartTime.current = Date.now();
        isDragging.current = true;
        startX.current = clientX;

        // Stop auto-rotation
        hasEverInteracted.current = true;
        setShouldAutoRotate(false);
        if (autoRotateAnimationFrame.current) {
            cancelAnimationFrame(autoRotateAnimationFrame.current);
            isAutoRotating.current = false;
        }
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }

        rotationY.stop();
        velocity.current = 0;
        if (ringRef.current) {
            ringRef.current.style.cursor = 'grabbing';
        }
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchmove', handleDrag, { passive: false });
        document.addEventListener('touchend', handleDragEnd);
    };

    const handleDrag = (event) => {
        if (!draggable || !isDragging.current) return;

        const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
        const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

        // Check if we've exceeded drag threshold
        const deltaFromStart = Math.sqrt(
            Math.pow(clientX - dragStartPos.current.x, 2) +
            Math.pow(clientY - dragStartPos.current.y, 2)
        );

        if (deltaFromStart > DRAG_THRESHOLD) {
            hasDragged.current = true;
        }

        const deltaX = clientX - startX.current;
        velocity.current = -deltaX * 0.5;
        rotationY.set(currentRotationY.current + velocity.current);
        startX.current = clientX;
    };

    const handleDragEnd = () => {
        isDragging.current = false;
        if (ringRef.current) {
            ringRef.current.style.cursor = 'grab';
            currentRotationY.current = rotationY.get();
        }

        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDrag);
        document.removeEventListener('touchend', handleDragEnd);

        const initial = rotationY.get();
        const velocityBoost = velocity.current * inertiaVelocityMultiplier;
        const target = initial + velocityBoost;

        animate(initial, target, {
            type: 'inertia',
            velocity: velocityBoost,
            power: inertiaPower,
            timeConstant: inertiaTimeConstant,
            restDelta: 0.5,
            modifyTarget: (target) => Math.round(target / angle) * angle,
            onUpdate: (latest) => {
                rotationY.set(latest);
            },
        });

        velocity.current = 0;

        // Start 5-second inactivity timer to resume auto-rotation
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }
        inactivityTimer.current = setTimeout(() => {
            setShouldAutoRotate(true);
        }, 5000);

        // Small delay to ensure drag is processed before allowing clicks
        setTimeout(() => {
            hasDragged.current = false;
        }, 100);
    };

    const imageVariants = {
        hidden: { y: 200, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    const handleItemClick = (item, index) => {
        // Only trigger click if we didn't drag
        if (!hasDragged.current && onItemClick) {
            onItemClick(item, index);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`w-full h-full overflow-hidden select-none relative ${containerClassName}`}
            style={{
                backgroundColor,
                transform: `scale(${currentScale})`,
                transformOrigin: 'center center',
            }}
            onMouseDown={draggable ? handleDragStart : undefined}
            onTouchStart={draggable ? handleDragStart : undefined}
        >
            <div
                style={{
                    perspective: `${perspective}px`,
                    width: `${width}px`,
                    height: `${width * 1.33}px`,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <motion.div
                    ref={ringRef}
                    className={`w-full h-full absolute ${ringClassName}`}
                    style={{
                        transformStyle: 'preserve-3d',
                        rotateY: rotationY,
                        cursor: draggable ? 'grab' : 'default',
                    }}
                >
                    <AnimatePresence>
                        {showImages &&
                            images.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`w-full h-full absolute overflow-hidden rounded-2xl ${imageClassName}`}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        rotateY: index * -angle,
                                        z: -imageDistance * currentScale,
                                        transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                                        transform: centerIndex === index ? 'scale(1.15)' : 'scale(1)',
                                        opacity: centerIndex === index ? 1 : 0.7,
                                        transition: 'transform 0.3s ease, opacity 0.3s ease',
                                    }}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={imageVariants}
                                    transition={{
                                        delay: index * staggerDelay,
                                        duration: animationDuration,
                                        ease: easeOut,
                                    }}
                                    whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                                    onClick={() => handleItemClick(item, index)}
                                    onHoverStart={() => {
                                        if (isDragging.current) return;
                                        if (ringRef.current) {
                                            Array.from(ringRef.current.children).forEach((imgEl, i) => {
                                                if (i !== index) {
                                                    imgEl.style.opacity = `${hoverOpacity}`;
                                                }
                                            });
                                        }
                                    }}
                                    onHoverEnd={() => {
                                        if (isDragging.current) return;
                                        if (ringRef.current) {
                                            Array.from(ringRef.current.children).forEach((imgEl) => {
                                                imgEl.style.opacity = centerIndex === imgEl.dataset.index ? '1' : '0.7';
                                            });
                                        }
                                    }}
                                    data-index={index}
                                >
                                    {/* Image with proper object-fit */}
                                    <img
                                        src={item.image || item}
                                        alt={item.title || `Item ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    {/* Play Icon Overlay for Videos */}
                                    {showPlayIcon && item.type === 'video' && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transform: 'translateZ(10px)',
                                                opacity: centerIndex === index ? 1 : 0.8,
                                            }}
                                        >
                                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                                                <svg
                                                    className="w-8 h-8 text-navy-900 ml-1"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
