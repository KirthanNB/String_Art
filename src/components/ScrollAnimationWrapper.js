'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ScrollAnimationWrapper({
    children,
    animation = 'fadeInUp',
    delay = 0,
    className = ''
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const animations = {
        fadeInUp: {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
        },
        slideInLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
        },
        slideInRight: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
        },
        rotateIn: {
            hidden: { opacity: 0, rotate: -5, scale: 0.9 },
            visible: { opacity: 1, rotate: 0, scale: 1 }
        }
    };

    const selectedAnimation = animations[animation] || animations.fadeInUp;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={selectedAnimation}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
