'use client';

import { motion } from 'framer-motion';
import GoldenThreadDivider from './GoldenThreadDivider';

export default function ProcessSection() {
    const steps = [
        {
            id: 1,
            title: "Connect & Inquire",
            description: "Have a vision? DM us on Instagram or fill out our form. Perfect for custom portraits, couple gifts, or unique home decor.",
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            cta: {
                text: "Get In Touch",
                href: "#contact"
            }
        },
        {
            id: 2,
            title: "Personal Consultation",
            description: "We guide you through options—size, colors, and style. Whether it's a memory or a gift, we ensure it's exactly what you imagined.",
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            )
        },
        {
            id: 3,
            title: "Handcrafted Creation",
            description: "Once approved, we meticulously weave thousands of threads. A labor of love to turn your photo into a timeless masterpiece.",
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: 4,
            title: "Delivered with Love",
            description: "Securely packaged and shipped to your doorstep. The perfect surprise for your loved ones or a treat for yourself.",
            icon: (
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        }
    ];

    return (
        <section id="process" className="min-h-screen flex flex-col justify-center bg-navy-900 text-white py-20 overflow-visible relative">
            {/* Golden Thread Transition */}
            <div className="text-navy-900">
                <GoldenThreadDivider position="top" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
                        <span className="gradient-text">
                            How It Works
                        </span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
                        From your photo to a masterpiece in four simple steps.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 group flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Icon and Number */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-teal to-primary-pink flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                                    {step.icon}
                                </div>
                                <span className="text-6xl font-display font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
                                    0{step.id}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-500 mb-6">
                                {step.description}
                            </p>

                            {/* Optional CTA Button */}
                            {step.cta && (
                                <div className="mt-auto">
                                    <a
                                        href={step.cta.href}
                                        className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-teal to-primary-pink text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm"
                                    >
                                        {step.cta.text}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
