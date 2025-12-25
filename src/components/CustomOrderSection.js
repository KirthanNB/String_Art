'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function CustomOrderSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        size: 'medium',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry! We will contact you shortly.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            size: 'medium',
            message: ''
        });
    };

    return (
        <section id="custom-order" className="py-20 bg-gradient-to-br from-cream-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <ScrollAnimationWrapper animation="fadeInUp">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-4">
                                <span className="gradient-text">Bring Your Vision to Life</span>
                            </h2>
                            <p className="text-lg text-navy-700 max-w-2xl mx-auto">
                                Have a unique idea? We'd love to hear about it! Fill out the form below to start a conversation with our artists. We'll discuss your vision, provide a quote, and guide you through the process.
                            </p>
                        </div>
                    </ScrollAnimationWrapper>

                    <ScrollAnimationWrapper animation="fadeInUp" delay={0.2}>
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-cream-100 relative overflow-hidden">
                            {/* Decorative Background Blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none will-change-transform"></div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-navy-900">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-cream-100 focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 outline-none transition-all bg-cream-50/50"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-navy-900">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-cream-100 focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 outline-none transition-all bg-cream-50/50"
                                            placeholder="name@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-semibold text-navy-900">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-cream-100 focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 outline-none transition-all bg-cream-50/50"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="size" className="text-sm font-semibold text-navy-900">Preferred Size</label>
                                        <div className="relative">
                                            <select
                                                id="size"
                                                name="size"
                                                value={formData.size}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-cream-100 focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 outline-none transition-all bg-cream-50/50 appearance-none cursor-pointer"
                                            >
                                                <option value="small">Small (approx 12"x12")</option>
                                                <option value="medium">Medium (approx 18"x18")</option>
                                                <option value="large">Large (approx 24"x24")</option>
                                                <option value="custom">Custom Size</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-navy-700">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-navy-900">Tell us about your idea</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-cream-100 focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20 outline-none transition-all bg-cream-50/50 resize-none"
                                        placeholder="Describe the design, colors, or theme you have in mind..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-primary-teal to-primary-pink text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Send Inquiry</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-pink to-primary-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </form>
                        </div>
                    </ScrollAnimationWrapper>
                </div>
            </div>
        </section>
    );
}
