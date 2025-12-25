'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GooeyNav from './GooeyNav';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Smart Navbar Logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show on scroll up or at very top
            if (currentScrollY < 10 || currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else {
                // Hide on scroll down
                setIsVisible(false);
            }
            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };

        const handleMouseMove = (e) => {
            // Show if mouse is within top 100px
            if (e.clientY < 100) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [lastScrollY]);

    const navLinks = [
        { name: 'Home', href: '/#' },
        // { name: 'Innovations', href: '/innovations' }, // Removed as per request
        { name: 'Gallery', href: '/#gallery' },
        { name: 'Reels', href: '/#reels' },
        { name: 'Process', href: '/#process' },
        // { name: 'Custom Order', href: '/#custom-order' }, // Link to contact instead
        { name: 'Testimonials', href: '/#testimonials' },
        { name: 'Contact', href: '/#contact' },
    ];

    const scrollToSection = (e, href) => {
        setIsMobileMenuOpen(false);

        if (!href.includes('#')) return;

        if (pathname === '/') {
            e.preventDefault();
            const id = href.split('#')[1];
            const element = document.getElementById(id);

            if (element) {
                // Calculate position with offset for fixed navbar
                const headerOffset = 80; // Approximate height of the fixed navbar
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                // Add a small delay to allow the mobile menu to close smoothly first
                setTimeout(() => {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    };

    return (
        <motion.nav
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-transparent py-4' // Transparent because GooeyNav has its own glass bg
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo - Flex 1 to push Nav to center if possible, or just auto */}
                    <Link href="/" className="flex items-center space-x-3 group relative z-50 shrink-0">
                        <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                            <Image
                                src="https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287324/logo_phwu9l.png"
                                alt="Versatile String Art"
                                fill
                                className="object-contain rounded-full"
                                priority
                            />
                        </div>
                        <span className="font-display text-xl sm:text-2xl font-bold gradient-text hidden xl:block">
                            Versatile String Art
                        </span>
                        <span className="font-display text-xl font-bold gradient-text hidden sm:block xl:hidden">
                            VSA
                        </span>
                    </Link>

                    {/* Desktop Navigation - GooeyNav - Static Flow */}
                    <div className="hidden lg:block">
                        <GooeyNav
                            items={navLinks.map(link => ({ label: link.name, href: link.href }))}
                            particleCount={15}
                            particleDistances={[90, 10]}
                            particleR={100}
                            initialActiveIndex={0}
                            animationTime={600}
                            timeVariance={300}
                            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                            onItemClick={scrollToSection}
                        />
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block shrink-0">
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="relative group inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden"
                        >
                            {/* Animated Spinning Gradient Border - Brand Colors */}
                            <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#00B8A9_0%,#E91E63_25%,#FF6B35_50%,#FFD23F_75%,#00B8A9_100%)] animate-[spin_4s_linear_infinite]" />

                            {/* Inner Content Container - Subtle Tint */}
                            <div className="relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-950/90 shadow-[inset_0_0_20px_rgba(0,184,169,0.15)] text-white font-medium tracking-wide transition-all duration-300 group-hover:bg-slate-900/90 group-hover:shadow-[inset_0_0_30px_rgba(233,30,99,0.2)] group-hover:text-[#FFD23F]">
                                <span className="font-display">Get In Touch</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-all duration-300 group-hover:text-[#FFD23F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-navy-900 hover:text-primary-teal transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden mt-4 overflow-hidden"
                        >
                            <div className="flex flex-col space-y-4 py-4 bg-white/90 backdrop-blur-xl rounded-2xl px-6 shadow-xl border border-white/20">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.href)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-navy-900 hover:text-primary-teal font-medium transition-colors duration-300"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <a
                                    href="#contact"
                                    onClick={(e) => scrollToSection(e, '#contact')}
                                    className="relative group flex items-center justify-center w-full p-[2px] rounded-full overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#00B8A9_0%,#E91E63_25%,#FF6B35_50%,#FFD23F_75%,#00B8A9_100%)] animate-[spin_4s_linear_infinite]" />
                                    <div className="relative w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-950/90 shadow-[inset_0_0_20px_rgba(0,184,169,0.15)] text-white font-medium tracking-wide transition-all duration-300 group-hover:bg-slate-900/90 group-hover:shadow-[inset_0_0_30px_rgba(233,30,99,0.2)] group-hover:text-[#FFD23F]">
                                        <span className="font-display">Get In Touch</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-all duration-300 group-hover:text-[#FFD23F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav >
    );
}
