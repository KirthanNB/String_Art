'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import ReelViewer
const ReelViewer = dynamic(() => import('./ReelViewer'), { ssr: false });

export default function ReelSection() {
    const { isMobile } = useMediaQuery();
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const reels = [
        { id: 1, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287451/2389_edaerv.mp4', title: 'String Art Process', description: 'Watch our creation process', thumbnail: '/49603.jpg' },
        { id: 2, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287420/43418_ikvmuk.mp4', title: 'Artistic Technique', description: 'Behind the scenes craftsmanship', thumbnail: '/50565.jpg' },
        { id: 3, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287389/21244_rphe3k.mp4', title: 'Custom Creation', description: 'Making your vision reality', thumbnail: '/67366.jpg' },
        { id: 4, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287454/43430_jvvbju.mp4', title: 'Art in Motion', description: 'See the details come to life', thumbnail: '/70427.jpg' },
        { id: 5, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287500/43441_ovgq04.mp4', title: 'Precision Work', description: 'Every thread matters', thumbnail: '/70890.jpg' },
        { id: 6, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287427/43445_kptlcz.mp4', title: 'Creative Process', description: 'From concept to completion', thumbnail: '/77039.jpg' },
        { id: 7, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287423/43463_b31xbv.mp4', title: 'Masterpiece Making', description: 'Handcrafted with love', thumbnail: '/84608.jpg' },
        { id: 8, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287412/83591_ssme9g.mp4', title: 'Final Showcase', description: 'The finished artwork', thumbnail: '/1721.jpg' },
        { id: 9, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458949/VN20260103_130725_w2rhey.mp4', title: 'New Creation', description: 'Latest string art work', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458949/VN20260103_130725_w2rhey.jpg' },
        { id: 10, src: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458847/VID-20260103-WA0069_qda8gx.mp4', title: 'Latest Work', description: 'Fresh from our studio', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458847/VID-20260103-WA0069_qda8gx.jpg' },
    ];

    const openViewer = (index) => {
        setStartIndex(index);
        setIsViewerOpen(true);
    };

    return (
        <>
            <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-teal rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-pink rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 text-white"
                        >
                            Our <span className="gradient-text">Process</span> in Motion
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg sm:text-xl text-cream-100 max-w-2xl mx-auto font-light mb-8"
                        >
                            Watch the magic unfold as we transform threads into art
                        </motion.p>
                    </div>

                    {/* Reel Preview Grid */}
                    <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-4 gap-6'} max-w-5xl mx-auto mb-12`}>
                        {reels.map((reel, index) => (
                            <motion.div
                                key={reel.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                onClick={() => openViewer(index)}
                                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                            >
                                {/* Thumbnail */}
                                <div className="absolute inset-0 bg-navy-800">
                                    <Image
                                        src={reel.thumbnail}
                                        alt={reel.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover"
                                        priority={index < 2}
                                    />
                                </div>

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all">
                                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                                        {reel.title}
                                    </h3>
                                    <p className="text-cream-100 text-xs drop-shadow-lg line-clamp-1">
                                        {reel.description}
                                    </p>
                                </div>

                                {/* Hover border glow */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-primary-teal/0 group-hover:border-primary-teal/50 transition-all duration-300"></div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                    >
                        <button
                            onClick={() => openViewer(0)}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-teal to-primary-pink text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-4"
                        >
                            Watch All Reels
                        </button>
                        <p className="text-cream-100/60 text-sm">
                            Swipe through our creative process
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Reel Viewer Modal */}
            {isViewerOpen && (
                <ReelViewer
                    reels={reels}
                    initialIndex={startIndex}
                    onClose={() => setIsViewerOpen(false)}
                />
            )}
        </>
    );
}
