'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeDImageRing from './ThreeDImageRing';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import GoldenThreadDivider from './GoldenThreadDivider';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function ProcessRingSection() {
    const { isMobile } = useMediaQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false); // Default unmuted as requested

    const toggleMuted = (e) => {
        e.stopPropagation(); // Prevent pausing video
        setIsMuted(!isMuted);
    };

    const [isPlaying, setIsPlaying] = useState(true);
    const videoRefs = useRef([]);
    const containerRef = useRef(null);

    // Lightswind 3D Slider State
    const [progress, setProgress] = useState(50);
    const [isDown, setIsDown] = useState(false);
    const startX = useRef(0);

    // Process reels for circular ring display (9 videos for clean UI)
    const processReels = [
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287269/43433_mbhlqp.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287389/21244_rphe3k.mp4', title: 'String Art Process' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287298/43464_oxu6fj.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287451/2389_edaerv.mp4', title: 'Threading Technique' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287260/49603_brf4ny.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287420/43418_ikvmuk.mp4', title: 'Assembly Stage' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287265/49595_knnkhp.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287454/43430_jvvbju.mp4', title: 'Pattern Creation' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287272/67366_bomqdp.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287500/43441_ovgq04.mp4', title: 'Detail Work' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287276/70427_umnwlg.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287427/43445_kptlcz.mp4', title: 'Final Assembly' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287278/43462_k43cln.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287423/43463_b31xbv.mp4', title: 'Quality Check' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287293/44319_oyszei.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287412/83591_ssme9g.mp4', title: 'Finishing Touches' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287317/84608_x6mdw4.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1766287449/VID_20251220_060832_221_mdegnt.mp4', title: 'Creative Process' },
    ];

    // All reels including new videos for modal viewer (11 videos total)
    const allReels = [
        ...processReels,
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458949/VN20260103_130725_w2rhey.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458949/VN20260103_130725_w2rhey.mp4', title: 'New Creation' },
        { type: 'video', image: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458847/VID-20260103-WA0069_qda8gx.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458847/VID-20260103-WA0069_qda8gx.mp4', title: 'Latest Work' },
    ];

    const handleReelClick = (item, index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
        setIsPlaying(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsPlaying(false);
        // Pause all videos
        videoRefs.current.forEach(video => {
            if (video) video.pause();
        });
    };

    const scrollToReel = (index) => {
        if (containerRef.current) {
            const reelHeight = window.innerHeight;
            containerRef.current.scrollTo({
                top: index * reelHeight,
                behavior: 'smooth'
            });
        }
    };

    const togglePlay = () => {
        const currentVideo = videoRefs.current[currentIndex];
        if (currentVideo) {
            if (isPlaying) {
                currentVideo.pause();
            } else {
                currentVideo.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Auto-play current video and handle errors
    useEffect(() => {
        if (isModalOpen) {
            videoRefs.current.forEach((video, idx) => {
                if (video) {
                    if (idx === currentIndex) {
                        setTimeout(() => {
                            const playPromise = video.play();
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    console.log('Video play prevented:', error);
                                    setIsPlaying(false);
                                });
                            }
                        }, 100);
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
        }
    }, [currentIndex, isModalOpen]);

    // Scroll observer to update currentIndex and handle autoplay on scroll
    useEffect(() => {
        if (!isModalOpen || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        if (!isNaN(index) && index !== currentIndex) {
                            setCurrentIndex(index);
                            setIsPlaying(true); // Auto-play when scrolled into view
                        }
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.6 // Trigger when 60% of the video is visible
            }
        );

        const reelElements = containerRef.current.querySelectorAll('.reel-container');
        reelElements.forEach((el) => observer.observe(el));

        return () => {
            if (reelElements) reelElements.forEach((el) => observer.unobserve(el));
        };
    }, [isModalOpen, currentIndex]); // Only re-attach if modal state changes (not index) checks done inside

    // Keyboard controls
    useEffect(() => {
        if (!isModalOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                scrollToReel(currentIndex - 1);
            }
            if (e.key === 'ArrowDown' && currentIndex < allReels.length - 1) {
                scrollToReel(currentIndex + 1);
            }
            if (e.key === 'Escape') closeModal();
            if (e.key === ' ') {
                e.preventDefault();
                togglePlay();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, currentIndex, isPlaying]);

    // Helper for Card Stack Logic
    const [cardStackIndex, setCardStackIndex] = useState(0);

    const handleDragEnd = (event, info) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            // Swipe Right (Previous)
            setCardStackIndex((prev) => (prev > 0 ? prev - 1 : allReels.length - 1));
        } else if (info.offset.x < -threshold) {
            // Swipe Left (Next)
            setCardStackIndex((prev) => (prev < allReels.length - 1 ? prev + 1 : 0));
        }
    };

    return (
        <section id="reels" className="min-h-screen flex flex-col justify-center relative w-full py-12 lg:py-20 bg-gradient-to-b from-navy-900 to-navy-800 overflow-visible">
            {/* Golden Thread Transition */}
            <div className="text-navy-900 absolute top-0 left-0 w-full z-20">
                <GoldenThreadDivider position="top" flip={true} />
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-teal/20 rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-pink/20 rounded-full filter blur-3xl opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollAnimationWrapper animation="fadeInUp">
                    <div className="text-center mb-2 lg:mb-4 pt-12 lg:pt-0">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 text-white">
                            Our Process in <span className="gradient-text">Motion</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                            {isMobile ? 'Watch our process unfold in motion' : 'Drag to explore • Click to watch'}
                        </p>

                        {/* Instagram Link */}
                        <a
                            href="https://www.instagram.com/versatile_string_art/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-full transition-all duration-300 backdrop-blur-sm"
                        >
                            {/* Correct Instagram SVG */}
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                            </svg>
                            <span className="text-sm">@versatile_string_art</span>
                        </a>
                    </div>
                </ScrollAnimationWrapper>

                {/* Mobile: Auto-Scrolling Marquee (Zero Interaction) */}
                {isMobile ? (
                    <div className="relative w-full h-[500px] overflow-hidden bg-navy-900/50 pointer-events-none select-none">
                        {/* Gradient Masks */}
                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy-900 to-transparent z-10"></div>
                        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-900 to-transparent z-10"></div>

                        <motion.div
                            className="flex items-center gap-6 absolute top-1/2 -translate-y-1/2 pl-6"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30 // Slow, smooth scroll
                            }}
                            style={{ width: "max-content" }}
                        >
                            {[...allReels, ...allReels].map((reel, index) => (
                                <div
                                    key={`${reel.title}-${index}`}
                                    className="relative w-[260px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-black/20 z-10"></div>
                                    <img
                                        src={reel.image}
                                        alt={reel.title}
                                        className="w-full h-full object-cover"
                                        draggable={false}
                                    />

                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-20">
                                        <p className="text-white text-lg font-bold font-display">{reel.title}</p>
                                        <p className="text-white/60 text-xs uppercase tracking-widest">{reel.type === 'video' ? 'Reel' : 'Image'}</p>
                                    </div>

                                    {/* Number */}
                                    <div className="absolute top-4 left-4 text-white/10 text-6xl font-bold z-0">
                                        {((index % allReels.length) + 1).toString().padStart(2, '0')}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Static Hint (Moved slightly down) */}
                        <div className="absolute bottom-4 left-0 w-full text-center z-20">
                        </div>
                    </div>
                ) : (
                    /* Desktop: 3D Ring */
                    <div className="w-full h-[500px] lg:h-[600px] relative mt-0">
                        <ThreeDImageRing
                            images={processReels}
                            width={350}
                            perspective={2000}
                            imageDistance={600}
                            initialRotation={180}
                            animationDuration={1.5}
                            staggerDelay={0.08}
                            hoverOpacity={0.6}
                            inertiaPower={0.8}
                            inertiaTimeConstant={350}
                            inertiaVelocityMultiplier={15}
                            onItemClick={handleReelClick}
                            containerClassName="h-full"
                            showPlayIcon={true}
                        />
                    </div>
                )}
            </div>

            {/* Instructions */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="text-center mt-8 space-y-4 relative z-50"
            >
                <button
                    onClick={() => handleReelClick(allReels[0], 0)}
                    className="-translate-y-30 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-teal to-primary-pink text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                    </svg>
                    See All Reels
                </button>
            </motion.div>

            {/* Instagram-Style Vertical Scroll Viewer */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-50"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="fixed top-4 right-4 z-50 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all touch-manipulation"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Vertical Scroll Container */}
                        <div
                            ref={containerRef}
                            className="h-full w-full overflow-y-scroll snap-y snap-mandatory"
                            style={{
                                scrollSnapType: 'y mandatory',
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {allReels.map((reel, index) => (
                                <div
                                    key={index}
                                    data-index={index}
                                    className="reel-container h-screen w-full snap-start snap-always flex items-center justify-center relative"
                                    style={{ scrollSnapAlign: 'start' }}
                                >
                                    {/* Video Player */}
                                    <div className="relative w-full h-full max-w-md mx-auto bg-black">
                                        <video
                                            ref={(el) => (videoRefs.current[index] = el)}
                                            src={reel.video}
                                            className="absolute inset-0 w-full h-full object-cover z-10 will-change-transform" // Performance opt applied here
                                            loop
                                            muted={isMuted} // State applied here
                                            autoPlay
                                            playsInline
                                            controls={false}
                                            onClick={() => {
                                                if (index === currentIndex) togglePlay();
                                            }}
                                        />

                                        {/* Mute/Unmute Toggle Button */}
                                        <button
                                            onClick={toggleMuted}
                                            className="absolute top-4 right-4 z-40 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all touch-manipulation"
                                        >
                                            {isMuted ? (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" stroke="currentColor" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                                </svg>
                                            )}
                                        </button>

                                        {/* Custom Poster Overlay - Fades out when active */}
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none bg-black will-change-opacity" // Performance opt
                                            style={{ zIndex: index === currentIndex ? 1 : 20 }}
                                            animate={{ opacity: index === currentIndex ? 0 : 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <img
                                                src={reel.image}
                                                alt={reel.title}
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                        </motion.div>

                                        {/* Play/Pause Button Indicator */}
                                        <AnimatePresence>
                                            {index === currentIndex && !isPlaying && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                                                >
                                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Title - Bottom Left */}
                                        <div className="absolute bottom-20 left-0 right-0 px-6 z-30 pointer-events-none">
                                            <h3 className="text-white text-xl font-bold drop-shadow-2xl">
                                                {reel.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Instagram Link - Fixed Bottom */}
                        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
                            {/* Scroll Hint */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="flex flex-col items-center pointer-events-none"
                            >
                                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Scroll</p>
                                <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </motion.div>

                            <a
                                href="https://www.instagram.com/versatile_string_art/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg touch-manipulation"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                                </svg>
                                <span className="text-sm">@versatile_string_art</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .overflow-y-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
