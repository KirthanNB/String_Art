'use client';

import Link from 'next/link';
import Image from 'next/image';
import GoldenThreadDivider from './GoldenThreadDivider';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        quickLinks: [
            { name: 'Home', href: '#' },
            { name: 'Gallery', href: '#gallery' },
            { name: 'Our Process', href: '#process' },
            { name: 'Reviews', href: '#testimonials' },
        ],
        contact: [
            { name: 'DM on Instagram', href: 'https://www.instagram.com/versatile_string_art/' },
            { name: 'Email Us', href: 'mailto:versatileartistry18@gmail.com' },
            { name: 'Call Us', href: 'tel:+919591656479' },
        ],
    };

    return (
        <footer className="bg-navy-900 text-white pt-32 pb-8 border-t border-white/5 relative overflow-visible">
            {/* Golden Thread Transition */}
            <div className="text-navy-900">
                <GoldenThreadDivider position="top" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="https://res.cloudinary.com/dvrbxnmsx/image/upload/v1766287324/logo_phwu9l.png"
                                    alt="Versatile String Art"
                                    fill
                                    className="object-contain rounded-full"
                                />
                            </div>
                            <span className="font-display text-xl font-bold gradient-text">
                                Versatile String Art
                            </span>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
                            Transforming your precious memories into stunning handcrafted string art.
                            Each piece is a unique work of art created with passion and precision.
                        </p>

                        {/* Simplified Social Link */}
                        <a
                            href="https://www.instagram.com/versatile_string_art/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white hover:text-primary-pink transition-colors group"
                        >
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <span className="font-medium">Follow on Instagram</span>
                        </a>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary-teal transition-colors duration-300 flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary-teal transition-colors"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Get in Touch</h3>
                        <ul className="space-y-4">
                            {footerLinks.contact.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="text-gray-400 hover:text-primary-teal transition-colors duration-300 block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar - Simplified */}
                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Versatile String Art. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
