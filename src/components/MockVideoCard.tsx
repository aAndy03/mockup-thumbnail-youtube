import { useCallback, useState, useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { validateAspectRatio, fileToBase64, compressImage } from '../lib/thumbnail';

function UploadIcon() {
    return (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
        </svg>
    );
}

function WarningIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
    );
}

function EditIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
        </svg>
    );
}

function ClearIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
    );
}

function CameraIcon() {
    return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.2c1.8 0 3.2-1.4 3.2-3.2S13.8 8.8 12 8.8 8.8 10.2 8.8 12s1.4 3.2 3.2 3.2zm8-8.8h-3.2l-1.8-2H9l-1.8 2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8.4c0-1.1-.9-2-2-2zm-8 11c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
        </svg>
    );
}

export function MockVideoCard() {
    const { mockVideo, setMockVideo, setThumbnail } = useAppStore();
    const [isDragging, setIsDragging] = useState(false);
    const [isEditing, setIsEditing] = useState<'title' | 'channel' | null>(null);

    // Local state for text inputs - only commits to store on blur
    const [localTitle, setLocalTitle] = useState(mockVideo.title);
    const [localChannel, setLocalChannel] = useState(mockVideo.channelName);

    // Sync local state when store changes (e.g., undo/redo)
    useEffect(() => {
        setLocalTitle(mockVideo.title);
        setLocalChannel(mockVideo.channelName);
    }, [mockVideo.title, mockVideo.channelName]);

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

    const handleAvatarFile = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG)');
            return;
        }

        try {
            let base64 = await fileToBase64(file);
            base64 = await compressImage(base64, 100); // Smaller size for avatar
            setMockVideo({ customAvatar: base64 });
        } catch (error) {
            console.error('Error processing avatar:', error);
            alert('Error processing avatar. Please try again.');
        }
    }, [setMockVideo]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleThumbnailFile(file);
    }, [handleThumbnailFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleThumbnailFile(file);
    }, [handleThumbnailFile]);

    const handleAvatarInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleAvatarFile(file);
    }, [handleAvatarFile]);

    const clearThumbnail = useCallback(() => {
        setThumbnail(null, true);
    }, [setThumbnail]);

    const handleTitleBlur = useCallback(() => {
        setIsEditing(null);
        if (localTitle !== mockVideo.title) {
            setMockVideo({ title: localTitle });
        }
    }, [localTitle, mockVideo.title, setMockVideo]);

    const handleChannelBlur = useCallback(() => {
        setIsEditing(null);
        if (localChannel !== mockVideo.channelName) {
            setMockVideo({ channelName: localChannel });
        }
    }, [localChannel, mockVideo.channelName, setMockVideo]);

    return (
        <div className="group">
            {/* Thumbnail / Upload Zone */}
            <div
                className={`relative aspect-video rounded-xl overflow-hidden transition-all ${mockVideo.customThumbnail
                    ? 'bg-yt-dark-elevated'
                    : isDragging
                        ? 'bg-blue-500/20 border-2 border-dashed border-blue-500'
                        : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-dashed border-yt-border hover:border-blue-500'
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {mockVideo.customThumbnail ? (
                    <>
                        <img
                            src={mockVideo.customThumbnail}
                            alt="Custom thumbnail"
                            className="w-full h-full object-cover"
                        />
                        {/* Duration badge */}
                        <div className="absolute bottom-1 right-1 px-1 py-0.5 bg-black/80 rounded text-xs font-medium">
                            {mockVideo.duration}
                        </div>
                        {/* Controls overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <label className="p-2 bg-yt-dark-elevated rounded-full cursor-pointer hover:bg-yt-dark-hover transition-colors">
                                <EditIcon />
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleFileInput}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={clearThumbnail}
                                className="p-2 bg-yt-dark-elevated rounded-full hover:bg-red-500/50 transition-colors"
                            >
                                <ClearIcon />
                            </button>
                        </div>
                    </>
                ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                        <UploadIcon />
                        <span className="mt-2 text-sm font-medium text-yt-text-secondary">
                            {isDragging ? 'Drop image here' : 'Upload thumbnail'}
                        </span>
                        <span className="mt-1 text-xs text-yt-text-secondary">
                            JPG, PNG (16:9 recommended)
                        </span>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleFileInput}
                            className="hidden"
                        />
                    </label>
                )}

                {/* Aspect ratio warning */}
                {mockVideo.customThumbnail && !mockVideo.aspectRatioValid && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-yellow-600/90 rounded text-xs font-medium">
                        <WarningIcon />
                        <span>Not 16:9</span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex gap-3 mt-3">
                {/* Channel avatar - clickable for upload */}
                <div className="flex-shrink-0 relative group/avatar">
                    <label className="cursor-pointer block">
                        {mockVideo.customAvatar ? (
                            <img
                                src={mockVideo.customAvatar}
                                alt="Channel avatar"
                                className="w-9 h-9 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                                Y
                            </div>
                        )}
                        {/* Camera overlay on hover */}
                        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                            <CameraIcon />
                        </div>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleAvatarInput}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        {/* Editable title - uses local state */}
                        {isEditing === 'title' ? (
                            <input
                                type="text"
                                value={localTitle}
                                onChange={(e) => setLocalTitle(e.target.value)}
                                onBlur={handleTitleBlur}
                                onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
                                autoFocus
                                className="w-full bg-yt-dark-elevated px-2 py-1 rounded text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        ) : (
                            <h3
                                onClick={() => setIsEditing('title')}
                                className="text-sm font-medium line-clamp-2 leading-5 cursor-text hover:bg-yt-dark-hover px-1 -mx-1 rounded transition-colors"
                            >
                                {mockVideo.title}
                            </h3>
                        )}
                    </div>

                    {/* Editable channel - uses local state */}
                    {isEditing === 'channel' ? (
                        <input
                            type="text"
                            value={localChannel}
                            onChange={(e) => setLocalChannel(e.target.value)}
                            onBlur={handleChannelBlur}
                            onKeyDown={(e) => e.key === 'Enter' && handleChannelBlur()}
                            autoFocus
                            className="w-full bg-yt-dark-elevated px-2 py-1 rounded text-sm text-yt-text-secondary focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                        />
                    ) : (
                        <div
                            onClick={() => setIsEditing('channel')}
                            className="mt-1 text-yt-text-secondary text-sm cursor-text hover:bg-yt-dark-hover px-1 -mx-1 rounded transition-colors inline-block"
                        >
                            {mockVideo.channelName}
                        </div>
                    )}

                    <div className="text-yt-text-secondary text-sm">
                        {mockVideo.views} • {mockVideo.timestamp}
                    </div>
                </div>
            </div>

            {/* Image dimensions info */}
            {mockVideo.customThumbnail && mockVideo.originalWidth && mockVideo.originalHeight && (
                <div className="mt-2 text-xs text-yt-text-secondary text-center">
                    {mockVideo.originalWidth} × {mockVideo.originalHeight}px
                    {mockVideo.aspectRatioValid
                        ? ' ✓ Good aspect ratio'
                        : ` (${(mockVideo.originalWidth / mockVideo.originalHeight).toFixed(2)}:1 - Should be 1.78:1)`
                    }
                </div>
            )}
        </div>
    );
}
