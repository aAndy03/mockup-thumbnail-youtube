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

interface VideoCardListProps {
    video: Video;
}

export function VideoCardList({ video }: VideoCardListProps) {
    return (
        <div className="group flex gap-4 cursor-pointer">
            {/* Large Thumbnail */}
            <div className="relative flex-shrink-0 w-[480px] aspect-video rounded-xl overflow-hidden bg-yt-dark-elevated">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('maxresdefault')) {
                            target.src = target.src.replace('maxresdefault', 'hqdefault');
                        }
                    }}
                />
                {/* Duration badge */}
                <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-xs font-medium">
                    {video.duration}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 py-1">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-medium line-clamp-2 leading-6">
                        {video.title}
                    </h3>
                    <button className="flex-shrink-0 p-1 -mr-1 opacity-0 group-hover:opacity-100 rounded-full hover:bg-yt-dark-hover transition-all">
                        <MoreIcon />
                    </button>
                </div>

                <div className="mt-1 text-yt-text-secondary text-sm">
                    {video.views} • {video.timestamp}
                </div>

                <div className="mt-3 flex items-center gap-2">
                    <img
                        src={video.channelAvatar}
                        alt={video.channelName}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-yt-text-secondary text-sm hover:text-yt-text flex items-center">
                        {video.channelName}
                        {video.verified && <VerifiedIcon />}
                    </span>
                </div>

                {/* Description preview - simulated */}
                <p className="mt-2 text-yt-text-secondary text-sm line-clamp-2">
                    Watch this amazing video content. Click to learn more about {video.title.toLowerCase()}.
                </p>

                {/* Subtitles badge */}
                <div className="mt-2">
                    <span className="px-1.5 py-0.5 text-xs bg-yt-dark-hover text-yt-text-secondary rounded">
                        Subtitles
                    </span>
                </div>
            </div>
        </div>
    );
}
