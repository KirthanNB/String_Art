'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import GoldenThreadDivider from './GoldenThreadDivider';

// Infinite Loom Wave Component
const LoomStrand = ({ yBase, amplitude, frequency, speed, color, delay, thickness }) => {
    return (
        <motion.path
            d={`M-100,${yBase} Q720,${yBase + amplitude} 1540,${yBase}`}
            animate={{
                d: [
                    `M-100,${yBase} Q720,${yBase + amplitude} 1540,${yBase}`,
                    `M-100,${yBase} Q720,${yBase - amplitude} 1540,${yBase}`,
                    `M-100,${yBase} Q720,${yBase + amplitude} 1540,${yBase}`
                ]
            }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
            stroke={color}
            strokeWidth={thickness}
            fill="none"
            style={{ opacity: 0.6 }}
        />
    );
};

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    // 3D Tilt Logic
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 40, damping: 20 }); // Smoother, heavier feel
    const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2deg", "-2deg"]); // Very subtle tilt
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);
    const bgX = useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch("https://formsubmit.co/ajax/versatileartistry18@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    _subject: `New Inquiry: ${formData.subject}`,
                    _template: 'table',
                    _captcha: 'false'
                })
            });

            if (response.ok) {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 8000);
            } else {
                throw new Error('Form submission failed');
            }

        } catch (err) {
            console.error('Form Error:', err);
            setError('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-center py-24 bg-cream-50 relative overflow-hidden perspective-2000">
            <style>{`
                .perspective-2000 { perspective: 2000px; }
                .transform-style-3d { transform-style: preserve-3d; }
            `}</style>

            {/* Infinite Loom Background - Brand Colors */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 800">
                        {/* Primary Brand Strands (Teal & Pink) */}
                        <LoomStrand yBase={100} amplitude={150} speed={15} color="#00B8A9" delay={0} thickness={1.5} /> {/* Teal */}
                        <LoomStrand yBase={300} amplitude={-120} speed={18} color="#E91E63" delay={1} thickness={1.5} /> {/* Pink */}
                        <LoomStrand yBase={500} amplitude={140} speed={20} color="#00B8A9" delay={2} thickness={1.5} /> {/* Teal */}

                        {/* Secondary Brand Strands (Orange & Yellow) */}
                        <LoomStrand yBase={150} amplitude={-100} speed={14} color="#FF6B35" delay={0.5} thickness={1.5} /> {/* Orange */}
                        <LoomStrand yBase={350} amplitude={110} speed={17} color="#FFD23F" delay={1.5} thickness={1.5} /> {/* Yellow */}
                        <LoomStrand yBase={550} amplitude={-100} speed={19} color="#FF6B35" delay={2.5} thickness={1.5} /> {/* Orange */}

                        {/* Accent Strands (Deep Mix) */}
                        <LoomStrand yBase={200} amplitude={80} speed={22} color="#00B8A9" delay={1} thickness={1} />
                        <LoomStrand yBase={600} amplitude={-80} speed={24} color="#E91E63" delay={3} thickness={1} />
                        <LoomStrand yBase={750} amplitude={120} speed={16} color="#FFD23F" delay={1} thickness={1} />
                    </svg>
                </motion.div>
            </div>

            {/* Golden Thread Transition */}
            <div className="text-white relative z-10 -mt-24 mb-12">
                <GoldenThreadDivider position="top" flip={true} />
            </div>

            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <ScrollAnimationWrapper animation="fadeInUp">
                    <div className="text-center mb-16 transform-style-3d">
                        <motion.h2
                            className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-4 drop-shadow-2xl"
                            animate={{ textShadow: ["0 0 0px #fff", "0 0 20px rgba(0, 184, 169, 0.3)", "0 0 0px #fff"] }} // Teal Glow
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-teal via-primary-pink to-primary-orange">
                                Let's Weave Magic
                            </span>
                        </motion.h2>
                        <p className="text-xl text-navy-700 max-w-2xl mx-auto font-light">
                            Start the conversation and let us craft your vision into reality.
                        </p>
                    </div>
                </ScrollAnimationWrapper>

                {/* Floating Layers Layout Container */}
                <motion.div
                    ref={ref}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="w-full max-w-6xl relative flex flex-col md:flex-row items-stretch min-h-[600px] perspective-1000"
                >
                    {/* Layer 1: Brand Teal Gradient Sidebar (Left, Back Layer) */}
                    <div className="w-full md:w-2/5 md:absolute md:left-0 md:top-0 md:bottom-0 bg-gradient-to-br from-primary-teal to-[#00796B] text-white p-10 md:p-12 rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-r-none shadow-[0_20px_50px_rgba(0,184,169,0.3)] z-10 flex flex-col justify-center relative overflow-hidden group">

                        {/* Subtle Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                        <div className="relative z-10 space-y-12">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#FFD23F] drop-shadow-md">
                                    Get in Touch
                                </h3>
                                <div className="w-24 h-1.5 bg-gradient-to-r from-[#FFD23F] to-transparent rounded-full shadow-[0_0_10px_rgba(255,210,63,0.3)]"></div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-1">
                                    <p className="text-white/70 text-sm font-medium uppercase tracking-widest">Email</p>
                                    <a href="mailto:versatileartistry18@gmail.com" className="text-xl font-semibold hover:text-[#FFD23F] transition-colors block">versatileartistry18@gmail.com</a>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/70 text-sm font-medium uppercase tracking-widest">Phone</p>
                                    <a href="tel:+919591656479" className="text-xl font-semibold hover:text-[#FFD23F] transition-colors block">+91 95916 56479</a>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white/70 text-sm font-medium uppercase tracking-widest">Social</p>
                                    <a href="https://www.instagram.com/versatile_string_art/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-xl font-semibold hover:text-[#E91E63] transition-colors group/insta">
                                        <div className="p-2 bg-white/10 rounded-full group-hover/insta:bg-white/20 transition-all">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zM16.25 20.5c2.45 0 4.25-1.8 4.25-4.25v-8.5c0-2.45-1.8-4.25-4.25-4.25h-8.5c-2.45 0-4.25 1.8-4.25 4.25v8.5c0 2.45 1.8 4.25 4.25 4.25h8.5zM12 7c2.75 0 5 2.25 5 5s-2.25 5-5 5-5-2.25-5-5 2.25-5 5-5zm0 8.5c1.9 0 3.5-1.6 3.5-3.5s-1.6-3.5-3.5-3.5-3.5 1.6-3.5 3.5 1.6 3.5 3.5 3.5zm5.5-8.8c0 .6-.45 1.05-1.05 1.05-.55 0-1-.45-1-1.05 0-.55.45-1 1-1.05.6 0 1.05.45 1.05 1.05z" />
                                            </svg>
                                        </div>
                                        @versatile_string_art
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layer 2: Glass Contact Form (Right, Floating Front Layer) */}
                    <div className="w-full md:w-3/5 md:ml-auto bg-white/60 backdrop-blur-2xl p-8 md:p-12 rounded-b-[2rem] md:rounded-[2rem] shadow-[0_30px_80px_rgba(0,184,169,0.15)] border border-white/80 relative z-20 md:transform md:-translate-x-12 md:-translate-y-8 glass-card-float">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="block text-navy-800 font-semibold mb-2 ml-1 text-xs uppercase tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-3 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal/50 outline-none transition-all placeholder-navy-300 text-navy-900"
                                        placeholder="What should we call you?"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-navy-800 font-semibold mb-2 ml-1 text-xs uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-3 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:border-primary-pink focus:ring-1 focus:ring-primary-pink/50 outline-none transition-all placeholder-navy-300 text-navy-900"
                                        placeholder="Where can we reach you?"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-navy-800 font-semibold mb-2 ml-1 text-xs uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-5 py-3 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/50 outline-none transition-all placeholder-navy-300 text-navy-900"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div className="group">
                                    <label className="block text-navy-800 font-semibold mb-2 ml-1 text-xs uppercase tracking-wider">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-5 py-3 rounded-lg bg-white/50 border border-white/60 focus:bg-white focus:border-primary-teal focus:ring-1 focus:ring-primary-teal/50 outline-none transition-all resize-none placeholder-navy-300 text-navy-900"
                                        placeholder="Tell us about your dream piece..."
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm ml-1">{error}</p>}

                            <motion.button
                                type="submit"
                                disabled={isSubmitting || isSubmitted}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full px-8 py-4 rounded-lg text-white font-bold text-lg tracking-wide shadow-lg transition-all duration-300 ${isSubmitted ? 'bg-green-500' : 'bg-gradient-to-r from-primary-teal via-primary-pink to-primary-orange shadow-[0_10px_30px_rgba(0,184,169,0.3)] hover:shadow-[0_15px_40px_rgba(0,184,169,0.4)]'}`}
                            >
                                {isSubmitting ? 'Sending...' : isSubmitted ? 'Message Sent!' : 'Send Message'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
