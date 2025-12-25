'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive breakpoint detection
 * SSR-safe with proper hydration handling
 */
export function useMediaQuery() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);

        const updateMedia = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
            setIsDesktop(width >= 1024);
        };

        // Initial check
        updateMedia();

        // Listen for resize events
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    }, []);

    return {
        isMobile,
        isTablet,
        isDesktop,
        isHydrated // Use this to prevent hydration mismatches
    };
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}
