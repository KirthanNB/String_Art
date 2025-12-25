// Framer Motion Animation Variants

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const rotateIn = {
    hidden: { opacity: 0, rotate: -5, scale: 0.9 },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

// Hover animations
export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
};

export const hoverGlow = {
    boxShadow: "0 0 30px rgba(0, 184, 169, 0.6)",
    transition: { duration: 0.3 }
};

// GSAP Animation Presets
export const gsapFadeIn = {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
};

export const gsapSlideIn = {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
};

export const gsapScaleIn = {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)"
};

export const gsapParallax = (speed = 0.5) => ({
    y: () => window.innerHeight * speed,
    ease: "none"
});
