import { useCallback, useState, useMemo } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { videos } from '../data/videos';
import { validateAspectRatio, fileToBase64, compressImage } from '../lib/thumbnail';
import type { Video } from '../lib/schemas';

// Icons
function PlayIcon() {
    return (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function VolumeIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
    );
}

function FullscreenIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        </svg>
    );
}

function CaptionsIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z" />
        </svg>
    );
}

function TheaterIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
        </svg>
    );
}

function UploadIcon() {
    return (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
        </svg>
    );
}

function HideControlsIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
        </svg>
    );
}

function ShowControlsIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
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

function VerifiedIcon() {
    return (
        <svg className="w-3.5 h-3.5 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" />
        </svg>
    );
}

function LikeIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11z" />
        </svg>
    );
}

function DislikeIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 4h-1H6.57C5.5 4 4.59 4.67 4.38 5.61l-1.34 6C2.77 12.85 3.82 14 5.23 14h4.23l-1.52 4.94C7.62 19.97 8.46 21 9.62 21c.58 0 1.14-.24 1.52-.65L17 14h4V4h-4z" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 5.63L20.66 12 15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1l.86-.13V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
        </svg>
    );
}

function SaveIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z" />
        </svg>
    );
}

// Recommendation card component
interface RecommendationCardProps {
    video: Video;
    isUserThumbnail?: boolean;
    userThumbnail?: string | null;
    onUpload?: (file: File) => void;
}

function RecommendationCard({ video, isUserThumbnail, userThumbnail, onUpload }: RecommendationCardProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && onUpload) onUpload(file);
    }, [onUpload]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onUpload) onUpload(file);
    }, [onUpload]);

    return (
        <div className="flex gap-2 group cursor-pointer">
            {/* Thumbnail */}
            <div
                className={`relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden ${isUserThumbnail && !userThumbnail
                    ? isDragging
                        ? 'bg-blue-500/20 border-2 border-dashed border-blue-500'
                        : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-dashed border-yt-border'
                    : 'bg-yt-dark-elevated'
                    }`}
                onDrop={isUserThumbnail ? handleDrop : undefined}
                onDragOver={isUserThumbnail ? (e) => { e.preventDefault(); setIsDragging(true); } : undefined}
                onDragLeave={isUserThumbnail ? () => setIsDragging(false) : undefined}
            >
                {isUserThumbnail ? (
                    userThumbnail ? (
                        <img src={userThumbnail} alt="Your thumbnail" className="w-full h-full object-cover" />
                    ) : (
                        <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                            <UploadIcon />
                            <span className="text-xs text-yt-text-secondary mt-1">Upload</span>
                            <input type="file" accept="image/jpeg,image/png" onChange={handleFileInput} className="hidden" />
                        </label>
                    )
                ) : (
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
                )}
                {/* Duration */}
                <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-xs font-medium">
                    {video.duration}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 leading-5">
                    {isUserThumbnail ? 'Your Video Title' : video.title}
                </h4>
                <div className="mt-1 text-xs text-yt-text-secondary flex items-center">
                    {video.channelName}
                    {video.verified && <VerifiedIcon />}
                </div>
                <div className="text-xs text-yt-text-secondary">
                    {video.views} • {video.timestamp}
                </div>
            </div>

            <button className="flex-shrink-0 p-1 -mr-1 opacity-0 group-hover:opacity-100 rounded-full hover:bg-yt-dark-hover transition-all self-start">
                <MoreIcon />
            </button>
        </div>
    );
}

export function WatchPage() {
    const { mockVideo, setThumbnail, playerThumbnailPlacement } = useAppStore();
    const [isDragging, setIsDragging] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isHoveringPlayer, setIsHoveringPlayer] = useState(false);

    // Get random videos for recommendations
    const recommendedVideos = videos.slice(0, 10);
    // Random video for main player when user thumbnail is only in recommendations
    // Memoized to prevent changing on hover/re-render
    const randomMainVideo = useMemo(() => videos[Math.floor(Math.random() * videos.length)], []);

    const showUserInMain = playerThumbnailPlacement === 'main' || playerThumbnailPlacement === 'both';
    const showUserInRec = playerThumbnailPlacement === 'recommendation' || playerThumbnailPlacement === 'both';

    const handleThumbnailFile = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG)');
            return;
        }

        try {
            const aspectResult = await validateAspectRatio(file);
            let base64 = await fileToBase64(file);
            base64 = await compressImage(base64);

            setThumbnail(
                base64,
                aspectResult.valid,
                aspectResult.width,
                aspectResult.height
            );
        } catch (error) {
            console.error('Error processing file:', error);
            alert('Error processing image. Please try again.');
        }
    }, [setThumbnail]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleThumbnailFile(file);
    }, [handleThumbnailFile]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleThumbnailFile(file);
    }, [handleThumbnailFile]);

    // Determine what to show in main player
    const mainPlayerThumbnail = showUserInMain
        ? (mockVideo.customThumbnail || null)
        : randomMainVideo.thumbnailUrl;

    return (
        <div className="flex gap-6 max-w-[1800px] mx-auto">
            {/* Main content area */}
            <div className="flex-1 min-w-0">
                {/* Video Player */}

                {/* Video Player */}
                <div
                    className={`group/player relative w-full aspect-video rounded-xl overflow-hidden ${showUserInMain && !mockVideo.customThumbnail
                        ? isDragging
                            ? 'bg-blue-500/20 border-2 border-dashed border-blue-500'
                            : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-dashed border-yt-border'
                        : 'bg-black'
                        }`}
                    onDrop={showUserInMain ? handleDrop : undefined}
                    onDragOver={showUserInMain ? (e) => { e.preventDefault(); setIsDragging(true); } : undefined}
                    onDragLeave={showUserInMain ? () => setIsDragging(false) : undefined}
                    onMouseEnter={() => setIsHoveringPlayer(true)}
                    onMouseLeave={() => setIsHoveringPlayer(false)}
                >
                    {showUserInMain ? (
                        mockVideo.customThumbnail ? (
                            <img src={mockVideo.customThumbnail} alt="Your thumbnail" className="w-full h-full object-cover" />
                        ) : (
                            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                                <UploadIcon />
                                <span className="mt-4 text-lg font-medium text-yt-text-secondary">
                                    {isDragging ? 'Drop your thumbnail here' : 'Upload your thumbnail'}
                                </span>
                                <span className="mt-2 text-sm text-yt-text-secondary">
                                    This will appear as the main video player
                                </span>
                                <input type="file" accept="image/jpeg,image/png" onChange={handleFileInput} className="hidden" />
                            </label>
                        )
                    ) : (
                        <img src={mainPlayerThumbnail!} alt="Video thumbnail" className="w-full h-full object-cover" />
                    )}

                    {/* Toggle controls button - appears on hover */}
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className={`absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition-all ${isHoveringPlayer ? 'opacity-100' : 'opacity-0'}`}
                        title={showControls ? 'Hide player controls' : 'Show player controls'}
                    >
                        {showControls ? <HideControlsIcon /> : <ShowControlsIcon />}
                    </button>

                    {/* Fake controls overlay */}
                    {showControls && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            {/* Progress bar */}
                            <div className="relative h-1 bg-white/30 rounded-full mb-3">
                                <div className="absolute left-0 top-0 h-full w-[3%] bg-red-600 rounded-full" />
                                <div className="absolute left-[3%] top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full" />
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button className="hover:scale-110 transition-transform">
                                        <PlayIcon />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded-full">
                                        <VolumeIcon />
                                    </button>
                                    <span className="text-sm">0:03 / 9:24</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-white/10 rounded-full">
                                        <CaptionsIcon />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded-full">
                                        <SettingsIcon />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded-full">
                                        <TheaterIcon />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded-full">
                                        <FullscreenIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Video info */}
                <div className="mt-4">
                    <h1 className="text-xl font-semibold">
                        {showUserInMain ? mockVideo.title : randomMainVideo.title}
                    </h1>

                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold">
                                {showUserInMain ? 'Y' : randomMainVideo.channelName[0]}
                            </div>
                            <div>
                                <div className="font-medium flex items-center">
                                    {showUserInMain ? mockVideo.channelName : randomMainVideo.channelName}
                                    <VerifiedIcon />
                                </div>
                                <div className="text-sm text-yt-text-secondary">27M subscribers</div>
                            </div>
                            <button className="ml-4 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
                                Join
                            </button>
                            <button className="px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
                                Subscribe
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-yt-dark-elevated rounded-full">
                                <button className="flex items-center gap-2 px-4 py-2 hover:bg-yt-dark-hover rounded-l-full transition-colors">
                                    <LikeIcon />
                                    <span>311K</span>
                                </button>
                                <div className="w-px h-6 bg-yt-border" />
                                <button className="px-4 py-2 hover:bg-yt-dark-hover rounded-r-full transition-colors">
                                    <DislikeIcon />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-yt-dark-elevated rounded-full hover:bg-yt-dark-hover transition-colors">
                                <ShareIcon />
                                <span>Share</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-yt-dark-elevated rounded-full hover:bg-yt-dark-hover transition-colors">
                                <SaveIcon />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="mt-4 p-3 bg-yt-dark-elevated rounded-xl">
                    <div className="text-sm font-medium">
                        {showUserInMain ? mockVideo.views : randomMainVideo.views} • {showUserInMain ? mockVideo.timestamp : randomMainVideo.timestamp}
                    </div>
                    <p className="mt-2 text-sm">
                        This is a preview of how your thumbnail will look on YouTube's watch page.
                        The video player shows your uploaded thumbnail as it would appear when someone watches your video.
                    </p>
                </div>
            </div>

            {/* Recommendations sidebar */}
            <div className="w-[360px] flex-shrink-0">
                <div className="flex flex-col gap-3">
                    {recommendedVideos.map((video, index) => (
                        <RecommendationCard
                            key={video.id}
                            video={video}
                            isUserThumbnail={showUserInRec && index === 3}
                            userThumbnail={showUserInRec && index === 3 ? mockVideo.customThumbnail : undefined}
                            onUpload={showUserInRec && index === 3 ? handleThumbnailFile : undefined}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
