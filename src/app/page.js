'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductGallery from '@/components/ProductGallery';
import dynamic from 'next/dynamic';

// Lazy load below-the-fold components for better performance
const ProcessSection = dynamic(() => import('@/components/ProcessSection'), {
  loading: () => <div className="min-h-screen" />,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="min-h-screen" />,
});

const InstagramSection = dynamic(() => import('@/components/InstagramSection'), {
  loading: () => <div className="min-h-[50vh]" />,
});

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => <div className="min-h-screen" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[30vh]" />,
});

const ProcessRingSection = dynamic(() => import('@/components/ProcessRingSection'), {
  loading: () => <div className="min-h-screen" />,
});

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSpacer = ({ image }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <div ref={ref} className="h-[50vh] w-full relative overflow-hidden">
      <motion.div
        style={{ y, scale, backgroundImage: `url(${image})` }}
        className="absolute inset-0 bg-center bg-cover h-[140%] -top-[20%] will-change-transform"
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Hero />
      <ProductGallery />
      <ProcessRingSection />
      <ProcessSection />
      {/* <CustomOrderSection /> - Removed as per user request to use ContactForm instead */}
      <Testimonials />
      <InstagramSection />
      <ContactForm />
      <Footer />
    </div>
  );
}

