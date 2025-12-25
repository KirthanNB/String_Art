'use client';

import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import GoldenThreadDivider from './GoldenThreadDivider';

export default function InstagramSection() {
    // Curated gallery of real work
    const instagramPosts = [
        { id: 2, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287267/50565_dd68kq.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        // { id: 3, type: 'video', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0/v1766287449/VID_20251220_060832_221_mdegnt.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 4, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287328/Screenshot_20251220-193840.Instagram_ldjsac.png', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 6, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287317/84608_x6mdw4.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 7, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287272/67366_bomqdp.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 1, type: 'video', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0/v1766287389/21244_rphe3k.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 8, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287269/1721_pdvmsj.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        // { id: 9, type: 'video', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0/v1766287451/2389_edaerv.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 10, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287278/43462_k43cln.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        // { id: 11, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287293/44319_oyszei.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        { id: 5, type: 'video', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/video/upload/so_0/v1766293056/84845_1_tdzkhg.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
        // { id: 12, type: 'image', thumbnail: 'https://res.cloudinary.com/dvrbxnmsx/image/upload/w_400,q_auto/v1766287260/49603_brf4ny.jpg', url: 'https://www.instagram.com/versatile_string_art/' },
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center py-20 bg-white relative overflow-visible">
            {/* Golden Thread Transition */}
            <div className="text-white">
                <GoldenThreadDivider position="top" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollAnimationWrapper animation="fadeInUp">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold">
                                <span className="text-navy-900">Follow Us</span>
                            </h2>
                        </div>
                        <p className="text-lg sm:text-xl text-navy-700 max-w-2xl mx-auto mb-8">
                            Join our community on Instagram for daily inspiration and behind-the-scenes
                        </p>
                        <a
                            href="https://www.instagram.com/versatile_string_art/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <span className="font-medium">@versatile_string_art</span>
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </ScrollAnimationWrapper>

                {/* Instagram Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {instagramPosts.map((post, index) => (
                        <ScrollAnimationWrapper
                            key={post.id}
                            animation="scaleIn"
                            delay={index * 0.05}
                        >
                            <a
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-square block overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Post Image/Thumbnail */}
                                <img
                                    src={post.thumbnail}
                                    alt="Instagram post"
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Icon Overlay (Video/Image) */}
                                <div className="absolute top-3 right-3 text-white drop-shadow-md opacity-80">
                                    {post.type === 'video' ? (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M10 9v6l5-3-5-3zm-3-5h8c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                        </svg>
                                    )}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2 text-white font-medium text-sm flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="Logo" viewBox="0 0 448 512">
                                                <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                            </svg>
                                            View Post
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </ScrollAnimationWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
}
