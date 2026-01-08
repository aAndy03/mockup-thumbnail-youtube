import { motion } from 'framer-motion';
import type { Video } from '../lib/schemas';

function VerifiedIcon() {
    return (
        <svg className="w-3.5 h-3.5 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" />
        </svg>
    );
}

function MoreIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z" />
        </svg>
    );
}

interface VideoCardProps {
    video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
    return (
        <motion.div
            className="group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-yt-dark-elevated">
                <motion.img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                        // Fallback to hq if maxres fails
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('maxresdefault')) {
                            target.src = target.src.replace('maxresdefault', 'hqdefault');
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                />
                {/* Duration badge */}
                <motion.div
                    className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-xs font-medium"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                >
                    {video.duration}
                </motion.div>
                {/* Hover overlay */}
                <motion.div
                    className="absolute inset-0 bg-black/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
            </div>

            {/* Info */}
            <div className="flex gap-3 mt-3">
                {/* Channel avatar */}
                <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                    <img
                        src={video.channelAvatar}
                        alt={video.channelName}
                        className="w-9 h-9 rounded-full object-cover"
                    />
                </motion.div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-medium line-clamp-2 leading-5">
                            {video.title}
                        </h3>
                        <motion.button
                            className="flex-shrink-0 p-1 -mr-1 opacity-0 group-hover:opacity-100 rounded-full hover:bg-yt-dark-hover transition-all"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <MoreIcon />
                        </motion.button>
                    </div>
                    <div className="mt-1 flex items-center text-yt-text-secondary text-sm">
                        <span className="hover:text-yt-text transition-colors">{video.channelName}</span>
                        {video.verified && <VerifiedIcon />}
                    </div>
                    <div className="text-yt-text-secondary text-sm">
                        {video.views} • {video.timestamp}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
