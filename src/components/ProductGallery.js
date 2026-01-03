'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';

// Dynamically import InfiniteMenu to prevent SSR issues
// Dynamically import DomeGallery to prevent SSR issues
const DomeGallery = dynamic(
    () => import('./DomeGallery'),
    { ssr: false }
);

import GoldenThreadDivider from './GoldenThreadDivider';

export default function ProductGallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { isMobile, isHydrated } = useMediaQuery();

    const products = [
        { id: 1, title: 'Custom Portrait Art', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287269/1721_pdvmsj.jpg', type: 'image', description: 'Beautiful handcrafted string art portrait' },
        { id: 2, title: 'Threading Process', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287298/43464_oxu6fj.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287451/2389_edaerv.mp4', type: 'video', description: 'Watch the intricate threading technique' },
        { id: 3, title: 'Abstract Creation', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287278/43462_k43cln.jpg', type: 'image', description: 'Modern abstract string art piece' },
        { id: 4, title: 'Detail Work', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287272/67366_bomqdp.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287500/43441_ovgq04.mp4', type: 'video', description: 'See the precision in every thread' },
        { id: 5, title: 'Elegant Design', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287293/44319_oyszei.jpg', type: 'image', description: 'Sophisticated string art pattern' },
        { id: 6, title: 'Assembly Stage', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287260/49603_brf4ny.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287420/43418_ikvmuk.mp4', type: 'video', description: 'Creative assembly process' },
        { id: 7, title: 'Detailed Artwork', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287269/49591_xgzbpw.jpg', type: 'image', description: 'Precision-crafted string design' },
        { id: 8, title: 'Pattern Creation', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287265/49595_knnkhp.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287454/43430_jvvbju.mp4', type: 'video', description: 'Pattern-making in action' },
        { id: 9, title: 'Artistic Expression', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287267/50565_dd68kq.jpg', type: 'image', description: 'Expressive string art creation' },
        { id: 10, title: 'Final Assembly', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287276/70427_umnwlg.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287427/43445_kptlcz.mp4', type: 'video', description: 'Final touches and assembly' },
        { id: 11, title: 'Masterpiece', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287276/70427_umnwlg.jpg', type: 'image', description: 'Stunning string art display' },
        { id: 12, title: 'Quality Check', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287278/43462_k43cln.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287423/43463_b31xbv.mp4', type: 'video', description: 'Quality inspection process' },
        { id: 13, title: 'Premium Art', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287302/77039_nv2szk.jpg', type: 'image', description: 'High-end string art piece' },
        { id: 14, title: 'Finishing Touches', image: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_600,q_auto:low/v1766287293/44319_oyszei.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/q_auto:low,w_600/v1766287412/83591_ssme9g.mp4', type: 'video', description: 'Final refinements' },
        { id: 15, title: 'New Creation', image: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458949/VN20260103_130725_w2rhey.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458949/VN20260103_130725_w2rhey.mp4', type: 'video', description: 'Latest string art work' },
        { id: 16, title: 'Latest Work', image: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458847/VID-20260103-WA0069_qda8gx.jpg', video: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/v1767458847/VID-20260103-WA0069_qda8gx.mp4', type: 'video', description: 'Fresh from our studio' },
    ];

    // Map products to DomeGallery format (src, alt)
    const domeImages = products.map(p => ({
        src: p.image,
        alt: p.title
    }));

    return (
        <section id="gallery" className="min-h-screen flex flex-col justify-center py-16 md:py-32 bg-gradient-to-br from-cream-50 via-primary-teal/5 to-primary-pink/5 relative overflow-visible">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.5] pointer-events-none mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent z-0"></div>

            {/* Golden Thread Transition */}
            <div className="text-white relative z-10">
                <GoldenThreadDivider position="top" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-4 md:mb-8 relative z-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6"
                    >
                        <span className="gradient-text">Our Gallery</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg sm:text-xl text-navy-700 max-w-2xl mx-auto font-light"
                    >
                        {isMobile ? '' : 'Drag to explore • Click to expand'}
                    </motion.p>
                </div>

                {/* DomeGallery - 3D Sphere */}
                <motion.div
                    className={`w-full relative ${isMobile ? 'h-[500px]' : 'h-[700px]'}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Globe Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-teal/10 via-purple-500/10 to-primary-pink/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-white/40 rounded-full blur-[120px] mix-blend-overlay"></div>
                    </div>

                    <DomeGallery
                        images={domeImages}
                        minRadius={isMobile ? 500 : 800}
                        maxRadius={isMobile ? 600 : 1000}
                        fit={0.95}
                        overlayBlurColor="rgba(0,0,0,0)"
                        openedImageWidth={isMobile ? '85vw' : '400px'}
                        openedImageHeight={isMobile ? '60vh' : '500px'}
                        grayscale={false}
                    />
                </motion.div>
            </div>

            {/* Note: Modal logic removed as DomeGallery has built-in expand functionality */}
        </section >
    );
}
