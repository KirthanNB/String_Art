'use client';

import { useEffect, useState } from 'react';

export default function FloatingContactButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 100px
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContact = (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a
            href="#contact"
            onClick={scrollToContact}
            className={`fixed bottom-8 right-8 z-[100] group transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            aria-label="Get In Touch"
        >
            <div className="relative flex items-center justify-center">

                {/* 1. Outer Glow (Behind everything) */}
                <div className="absolute inset-0 bg-[#00B8A9]/20 rounded-full blur-xl group-hover:bg-[#E91E63]/30 transition-all duration-500" />

                {/* 2. Tooltip Label (Must be outside the overflow-hidden container) */}
                <div className="absolute right-full mr-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none z-10">
                    <div className="bg-slate-900/95 border border-[#00B8A9]/30 text-[#FFD23F] px-4 py-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] whitespace-nowrap font-medium tracking-wide backdrop-blur-md">
                        Get in Touch
                    </div>
                </div>

                {/* 3. Button Container with Quantum Border */}
                <div className="relative w-16 h-16 md:w-18 md:h-18 p-[2px] rounded-full overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(0,184,169,0.4)] transition-all duration-500 group-hover:scale-110">

                    {/* The Quantum Border Gradient */}
                    <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#00B8A9_0%,#E91E63_25%,#FF6B35_50%,#FFD23F_75%,#00B8A9_100%)] animate-[spin_4s_linear_infinite]" />

                    {/* Inner Glass Content */}
                    <div className="relative w-full h-full rounded-full bg-slate-950/90 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,184,169,0.15)] group-hover:bg-slate-900/90 group-hover:shadow-[inset_0_0_30px_rgba(233,30,99,0.2)] transition-all duration-300">
                        {/* 4. The Royal Envelope Icon */}
                        <div className="relative z-10 text-[#C5A059] group-hover:text-[#FFD23F] transition-colors duration-300 transform group-hover:-rotate-12 transition-transform">
                            <svg className="w-8 h-8 md:w-9 md:h-9 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
