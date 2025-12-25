'use client';

import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from './ThreeDScrollTrigger';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import GoldenThreadDivider from './GoldenThreadDivider';

export default function Testimonials() {
    const textReviews = [
        {
            id: 't1',
            text: "I am truly amazed by the string art from Versatile Artistry. The work is neat, creative, and beyond my expectations.",
            rating: 5
        },
        {
            id: 't2',
            text: "The detailing in the string art is unbelievable. You can clearly see the effort and passion put into the work.",
            rating: 5
        },
        {
            id: 't3',
            text: "From ordering to delivery, everything was smooth. The artwork was delivered safely and looked absolutely stunning.",
            rating: 5
        },
        {
            id: 't4',
            text: "Highly recommended! If you want something special and meaningful, Versatile Artistry's string art is the perfect choice.",
            rating: 5
        }
    ];

    const mediaReviews = [
        { id: 'i1', type: 'image', url: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto:low/v1766287328/Screenshot_20251220-193840.Instagram_ldjsac.png' },
        {
            id: 'v1',
            type: 'video',
            url: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_300/v1766287389/21244_rphe3k.mp4',
            poster: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0,w_300/v1766287389/21244_rphe3k.jpg'
        },
        { id: 'i2', type: 'image', url: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto:low/v1766287267/50565_dd68kq.jpg' },
        {
            id: 'v2',
            type: 'video',
            url: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_300/v1766287449/VID_20251220_060832_221_mdegnt.mp4',
            poster: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0,w_300/v1766287449/VID_20251220_060832_221_mdegnt.jpg'
        },
        { id: 'i3', type: 'image', url: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto:low/v1766287317/84608_x6mdw4.jpg' },
        {
            id: 'v3',
            type: 'video',
            url: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_300/v1766293056/84845_1_tdzkhg.mp4',
            poster: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0,w_300/v1766293056/84845_1_tdzkhg.jpg'
        },
    ];

    // Lazy video component
    const LazyVideo = ({ src, poster }) => {
        const videoRef = useRef(null);

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            video.play().catch(() => { });
                        } else {
                            video.pause();
                        }
                    });
                },
                { threshold: 0.3 }
            );

            observer.observe(video);
            return () => observer.disconnect();
        }, []);

        return (
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-full object-cover"
            />
        );
    };

    return (
        <section id="testimonials" className="min-h-screen flex flex-col justify-center py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white overflow-hidden relative">
            {/* Golden Thread Transition */}
            <div className="text-navy-900">
                <GoldenThreadDivider position="top" flip={true} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4">
                        <span className="gradient-text">Customer Love Stories</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-cream-100 max-w-2xl mx-auto">
                        See what our customers are saying and creating
                    </p>
                </motion.div>
            </div>

            <ThreeDScrollTriggerContainer>
                {/* Row 1: Text Reviews */}
                <ThreeDScrollTriggerRow baseVelocity={3} direction={1} className="mb-8">
                    {textReviews.map((review) => (
                        <div
                            key={review.id}
                            className="mx-3 w-[380px] bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col flex-shrink-0"
                        >
                            <div className="flex gap-1 mb-3 flex-shrink-0">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-primary-yellow fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-cream-100 italic mb-4 text-sm leading-relaxed whitespace-normal break-words flex-grow">
                                "{review.text}"
                            </p>
                            <p className="font-semibold text-primary-teal text-base flex-shrink-0">— {review.name}</p>
                        </div>
                    ))}
                </ThreeDScrollTriggerRow>

                {/* Row 2: Media (Images + Videos) */}
                <ThreeDScrollTriggerRow baseVelocity={4} direction={-1} className="mb-8">
                    {mediaReviews.map((item) => {
                        if (item.type === 'image') {
                            return (
                                <div
                                    key={item.id}
                                    className="mx-3 w-[320px] h-[380px] rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl bg-navy-800 flex-shrink-0"
                                >
                                    <img
                                        src={item.url}
                                        alt="Customer review"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            );
                        }

                        if (item.type === 'video') {
                            return (
                                <div
                                    key={item.id}
                                    className="mx-3 w-[240px] h-[420px] rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl bg-navy-800 flex-shrink-0"
                                >
                                    <LazyVideo src={item.url} poster={item.poster} />
                                </div>
                            );
                        }
                    })}
                </ThreeDScrollTriggerRow>
            </ThreeDScrollTriggerContainer>

            {/* CTA */}
            <div className="text-center mt-12">
                <motion.a
                    href="https://www.instagram.com/versatile_string_art/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-teal to-primary-pink text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    See More on Instagram
                </motion.a>
            </div>
        </section>
    );
}
