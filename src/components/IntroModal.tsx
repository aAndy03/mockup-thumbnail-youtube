import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Icons
function GitHubIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
    );
}

function SparkleIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
        </svg>
    );
}

function UploadCloudIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
        </svg>
    );
}

// Floating shapes for background
function FloatingShapes() {
    const shapes = [
        { x: '10%', y: '20%', size: 80, delay: 0, duration: 20 },
        { x: '80%', y: '30%', size: 60, delay: 2, duration: 25 },
        { x: '20%', y: '70%', size: 100, delay: 4, duration: 18 },
        { x: '70%', y: '60%', size: 50, delay: 1, duration: 22 },
        { x: '50%', y: '10%', size: 70, delay: 3, duration: 24 },
        { x: '90%', y: '80%', size: 40, delay: 5, duration: 19 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-3xl"
                    style={{
                        left: shape.x,
                        top: shape.y,
                        width: shape.size,
                        height: shape.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: shape.duration,
                        delay: shape.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

// Animated grid pattern
function GridPattern() {
    return (
        <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]" />
        </motion.div>
    );
}

interface IntroModalProps {
    onClose: () => void;
}

export function IntroModal({ onClose }: IntroModalProps) {
    const [step, setStep] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        // Animate through steps
        const timer1 = setTimeout(() => setStep(1), 500);
        const timer2 = setTimeout(() => setStep(2), 1000);
        const timer3 = setTimeout(() => setStep(3), 1500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to complete before actually closing
        setTimeout(() => {
            onClose();
        }, 600);
    };

    const features = [
        { icon: <UploadCloudIcon />, title: 'Upload & Preview', desc: 'Upload your thumbnail and see it in context' },
        { icon: <SparkleIcon />, title: 'Multiple Views', desc: 'Home page, search results, and watch page' },
        { icon: <ShieldIcon />, title: '100% Private', desc: 'Everything runs locally in your browser' },
    ];

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Backdrop with blur */}
            <motion.div
                className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isClosing ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Animated background elements */}
            <motion.div
                animate={{ opacity: isClosing ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >
                <FloatingShapes />
                <GridPattern />
            </motion.div>

            {/* Content - animates to bottom center when closing */}
            <motion.div
                className="relative z-10 max-w-2xl mx-auto px-6 text-center"
                animate={isClosing ? {
                    y: 'calc(50vh - 80px)',
                    scale: 0.1,
                    opacity: 0,
                } : {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                }}
            >
                {/* Logo animation */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                    className="mb-8"
                    layoutId="logo-badge"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-white/10">
                        <svg viewBox="0 0 90 20" className="h-8">
                            <defs>
                                <linearGradient id="ytGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF0000" />
                                    <stop offset="100%" stopColor="#CC0000" />
                                </linearGradient>
                            </defs>
                            <rect width="28" height="20" rx="4" fill="url(#ytGradient)" />
                            <path d="M11 6.5L18 10L11 13.5V6.5Z" fill="white" />
                        </svg>
                        <span className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                            YouTube Mockup Design
                        </span>
                    </div>
                </motion.div>

                {/* Main title */}
                <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-6"
                    initial={{ y: 50, opacity: 0 }}
                    animate={step >= 1 && !isClosing ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                        See Your Thumbnails
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        In Context
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-xl text-[#888] mb-10 max-w-lg mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={step >= 2 && !isClosing ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    Preview how your YouTube thumbnails will look on the platform before you upload.
                    Design with confidence.
                </motion.p>

                {/* Features */}
                <motion.div
                    className="grid grid-cols-3 gap-4 mb-10"
                    initial={{ y: 30, opacity: 0 }}
                    animate={step >= 3 && !isClosing ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                            initial={{ y: 20, opacity: 0 }}
                            animate={!isClosing ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ delay: isClosing ? 0 : 1.5 + i * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                            <div className="text-blue-400 mb-2 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-white text-sm mb-1">{feature.title}</h3>
                            <p className="text-xs text-[#666]">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex items-center justify-center gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={step >= 3 && !isClosing ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: isClosing ? 0 : 0.3, duration: 0.3 }}
                >
                    <motion.button
                        onClick={handleClose}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get Started
                    </motion.button>
                    <motion.a
                        href="https://github.com/yourusername/mockup-design-youtube"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <GitHubIcon />
                        View on GitHub
                    </motion.a>
                </motion.div>

                {/* Privacy notice */}
                <motion.div
                    className="mt-8 flex items-center justify-center gap-2 text-xs text-[#555]"
                    initial={{ opacity: 0 }}
                    animate={step >= 3 && !isClosing ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: isClosing ? 0 : 0.5 }}
                >
                    <ShieldIcon />
                    <span>
                        100% client-side • No data uploaded • No tracking • No cookies
                    </span>
                </motion.div>

                {/* Version */}
                <motion.div
                    className="mt-4 text-xs text-[#444]"
                    initial={{ opacity: 0 }}
                    animate={step >= 3 && !isClosing ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: isClosing ? 0 : 0.6 }}
                >
                    v1.0.0 • Made with ❤️ for creators
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
