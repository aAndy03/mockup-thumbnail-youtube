import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/videos';

function ChevronLeftIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.96 18.96 8 12l6.96-6.96.71.71L9.41 12l6.25 6.25-.7.71z" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z" />
        </svg>
    );
}

export function CategoryPills() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = 200;
        scrollContainerRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="relative bg-yt-dark sticky top-14 z-30 py-3">
            {/* Left scroll button */}
            <AnimatePresence>
                {showLeftArrow && (
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-r from-yt-dark via-yt-dark to-transparent pr-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.button
                            onClick={() => scroll('left')}
                            className="p-2 hover:bg-yt-dark-hover rounded-full transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeftIcon />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pills container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex gap-3 overflow-x-auto scrollbar-hide px-2"
            >
                {categories.map((category, index) => (
                    <motion.button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                            ? 'bg-pill-bg-active text-pill-text-active'
                            : 'bg-pill-bg text-pill-text hover:bg-yt-dark-active'
                            }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02, duration: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                    >
                        {category}
                    </motion.button>
                ))}
            </div>

            {/* Right scroll button */}
            <AnimatePresence>
                {showRightArrow && (
                    <motion.div
                        className="absolute right-0 top-0 bottom-0 flex items-center z-10 bg-gradient-to-l from-yt-dark via-yt-dark to-transparent pl-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.button
                            onClick={() => scroll('right')}
                            className="p-2 hover:bg-yt-dark-hover rounded-full transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRightIcon />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
