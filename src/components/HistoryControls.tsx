import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, type ViewMode, type PlayerThumbnailPlacement } from '../stores/useAppStore';
import { domToPng, domToJpeg } from 'modern-screenshot';

function UndoIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
        </svg>
    );
}

function RedoIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
        </svg>
    );
}

function ResetIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
    );
}

function GridViewIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z" />
        </svg>
    );
}

function ListViewIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
        </svg>
    );
}

function PlayerViewIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8zm-8-4l4 2.5L11 17v-5z" />
        </svg>
    );
}

function HideIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
    );
}

function ShowIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
        </svg>
    );
}

function ExportIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
    );
}

function ChevronDownIcon() {
    return (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

interface ViewToggleButtonProps {
    mode: ViewMode;
    currentMode: ViewMode;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    hasDropdown?: boolean;
}

function ViewToggleButton({ mode, currentMode, icon, label, onClick, hasDropdown }: ViewToggleButtonProps) {
    const isActive = mode === currentMode;
    return (
        <motion.button
            onClick={onClick}
            className={`p-2 rounded-full transition-colors flex items-center gap-0.5 ${isActive
                ? 'bg-yt-text text-yt-dark'
                : 'hover:bg-yt-dark-hover text-yt-text-secondary'
                }`}
            title={label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            {hasDropdown && isActive && <ChevronDownIcon />}
        </motion.button>
    );
}

interface PlacementButtonProps {
    placement: PlayerThumbnailPlacement;
    currentPlacement: PlayerThumbnailPlacement;
    label: string;
    onClick: () => void;
}

function PlacementButton({ placement, currentPlacement, label, onClick }: PlacementButtonProps) {
    const isActive = placement === currentPlacement;
    return (
        <motion.button
            onClick={onClick}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${isActive
                ? 'bg-blue-600 text-white'
                : 'bg-yt-dark-active text-yt-text-secondary hover:text-yt-text'
                }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {label}
        </motion.button>
    );
}

interface ExportModalProps {
    onClose: () => void;
    viewMode: ViewMode;
}

function ExportModal({ onClose, viewMode }: ExportModalProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [format, setFormat] = useState<'png' | 'jpg'>('png');
    const [quality, setQuality] = useState(2); // 1x, 2x, 3x

    const handleExport = async () => {
        setIsExporting(true);

        try {
            // Hide the floating controls during export
            const controls = document.querySelector('[data-controls]') as HTMLElement;
            if (controls) controls.style.display = 'none';

            // Get the main content area
            const mainContent = document.querySelector('main') as HTMLElement;
            if (!mainContent) {
                alert('Could not find content to export');
                return;
            }

            // Capture the content using modern-screenshot
            let dataUrl: string;
            if (format === 'png') {
                dataUrl = await domToPng(mainContent, {
                    scale: quality,
                    backgroundColor: '#0f0f0f',
                });
            } else {
                dataUrl = await domToJpeg(mainContent, {
                    scale: quality,
                    backgroundColor: '#0f0f0f',
                    quality: 0.95,
                });
            }

            // Show controls again
            if (controls) controls.style.display = '';

            // Download
            const link = document.createElement('a');
            link.download = `youtube-mockup-${viewMode}-${Date.now()}.${format}`;
            link.href = dataUrl;
            link.click();

            onClose();
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed. Please try again.');
        } finally {
            setIsExporting(false);
            // Ensure controls are visible
            const controls = document.querySelector('[data-controls]') as HTMLElement;
            if (controls) controls.style.display = '';
        }
    };

    const viewLabels = {
        grid: 'Home Page',
        list: 'Search Results',
        player: 'Watch Page'
    };

    const qualityLabels = ['1x', '2x', '3x'];
    const resolutionEstimates = {
        1: '~1920×1080',
        2: '~3840×2160',
        3: '~5760×3240'
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="bg-[#1a1a1a] rounded-xl shadow-2xl border border-[#333] overflow-hidden min-w-[420px]"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#2a2a2a] to-[#222] border-b border-[#333]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <ExportIcon />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Export Mockup</h3>
                        <p className="text-xs text-[#888]">Save as image file</p>
                    </div>
                </div>
                <motion.button
                    onClick={onClose}
                    className="p-1.5 rounded-md hover:bg-[#333] text-[#888] hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <CloseIcon />
                </motion.button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
                {/* Source Preview */}
                <div className="bg-[#0f0f0f] rounded-lg p-3 border border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#888] uppercase tracking-wider">Source</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 font-medium">
                            {viewLabels[viewMode]}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-9 rounded bg-gradient-to-br from-[#222] to-[#1a1a1a] border border-[#333] flex items-center justify-center">
                            {viewMode === 'grid' && <GridViewIcon />}
                            {viewMode === 'list' && <ListViewIcon />}
                            {viewMode === 'player' && <PlayerViewIcon />}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-white">Current View</p>
                            <p className="text-xs text-[#666]">All UI elements will be hidden</p>
                        </div>
                    </div>
                </div>

                {/* Format Selection */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#888] uppercase tracking-wider">Format</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <motion.button
                            onClick={() => setFormat('png')}
                            className={`relative p-3 rounded-lg border transition-all ${format === 'png'
                                ? 'bg-blue-600/10 border-blue-500 text-white'
                                : 'bg-[#1f1f1f] border-[#333] text-[#888] hover:border-[#444] hover:text-white'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {format === 'png' && (
                                <motion.div
                                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                            )}
                            <div className="text-left">
                                <p className="font-semibold text-sm">PNG</p>
                                <p className="text-xs text-[#666] mt-0.5">Lossless • Transparency</p>
                            </div>
                        </motion.button>
                        <motion.button
                            onClick={() => setFormat('jpg')}
                            className={`relative p-3 rounded-lg border transition-all ${format === 'jpg'
                                ? 'bg-blue-600/10 border-blue-500 text-white'
                                : 'bg-[#1f1f1f] border-[#333] text-[#888] hover:border-[#444] hover:text-white'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {format === 'jpg' && (
                                <motion.div
                                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                            )}
                            <div className="text-left">
                                <p className="font-semibold text-sm">JPEG</p>
                                <p className="text-xs text-[#666] mt-0.5">Smaller file • 95% quality</p>
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Quality/Scale Selection */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-[#888] uppercase tracking-wider">Scale</span>
                        <span className="text-xs text-[#666]">{resolutionEstimates[quality as keyof typeof resolutionEstimates]}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((q) => (
                            <motion.button
                                key={q}
                                onClick={() => setQuality(q)}
                                className={`py-2 px-3 rounded-lg border font-medium text-sm transition-all ${quality === q
                                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                                    : 'bg-[#1f1f1f] border-[#333] text-[#888] hover:border-[#444] hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {qualityLabels[q - 1]}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Settings Summary */}
                <div className="bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] overflow-hidden">
                    <div className="px-3 py-2 bg-[#1a1a1a] border-b border-[#2a2a2a]">
                        <span className="text-xs font-medium text-[#888] uppercase tracking-wider">Output Settings</span>
                    </div>
                    <div className="divide-y divide-[#2a2a2a]">
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs text-[#888]">Format</span>
                            <span className="text-xs text-white font-medium">{format.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs text-[#888]">Scale Factor</span>
                            <span className="text-xs text-white font-medium">{quality}x</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs text-[#888]">Estimated Size</span>
                            <span className="text-xs text-white font-medium">{resolutionEstimates[quality as keyof typeof resolutionEstimates]}</span>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs text-[#888]">Background</span>
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-sm bg-[#0f0f0f] border border-[#333]"></div>
                                <span className="text-xs text-white font-medium">#0f0f0f</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#1a1a1a] to-[#1f1f1f] border-t border-[#333] flex items-center justify-between">
                <motion.button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#888] hover:text-white hover:bg-[#333] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Cancel
                </motion.button>
                <motion.button
                    onClick={handleExport}
                    disabled={isExporting}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${isExporting
                        ? 'bg-[#333] text-[#666] cursor-wait'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20'
                        }`}
                    whileHover={!isExporting ? { scale: 1.02 } : {}}
                    whileTap={!isExporting ? { scale: 0.98 } : {}}
                >
                    {isExporting ? (
                        <>
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                className="inline-block w-4 h-4 border-2 border-[#555] border-t-[#888] rounded-full"
                            />
                            Exporting...
                        </>
                    ) : (
                        <>
                            <ExportIcon />
                            Export {format.toUpperCase()}
                        </>
                    )}
                </motion.button>
            </div>
        </motion.div>
    );
}

export function HistoryControls() {
    const {
        undo, redo, canUndo, canRedo, resetMockVideo, clearHistory,
        history, historyIndex, viewMode, setViewMode,
        playerThumbnailPlacement, setPlayerThumbnailPlacement
    } = useAppStore();

    const [isHidden, setIsHidden] = useState(false);
    const [showExport, setShowExport] = useState(false);

    if (isHidden) {
        return (
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsHidden(false)}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 p-2 bg-yt-dark-elevated/95 backdrop-blur-sm rounded-full shadow-lg border border-yt-border z-50 hover:bg-yt-dark-hover transition-colors"
                title="Show controls"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ShowIcon />
            </motion.button>
        );
    }

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50" data-controls>
            <AnimatePresence mode="wait">
                {showExport ? (
                    <ExportModal
                        key="export"
                        onClose={() => setShowExport(false)}
                        viewMode={viewMode}
                    />
                ) : (
                    <motion.div
                        key="controls"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="flex items-center gap-2 bg-yt-dark-elevated/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-yt-border"
                    >
                        {/* Hide button */}
                        <motion.button
                            onClick={() => setIsHidden(true)}
                            className="p-1.5 rounded-full hover:bg-yt-dark-hover text-yt-text-secondary transition-colors"
                            title="Hide controls"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <HideIcon />
                        </motion.button>

                        <div className="w-px h-5 bg-yt-border" />

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-1">
                            <ViewToggleButton
                                mode="grid"
                                currentMode={viewMode}
                                icon={<GridViewIcon />}
                                label="Grid view (Home)"
                                onClick={() => setViewMode('grid')}
                            />
                            <ViewToggleButton
                                mode="list"
                                currentMode={viewMode}
                                icon={<ListViewIcon />}
                                label="List view (Search)"
                                onClick={() => setViewMode('list')}
                            />
                            <ViewToggleButton
                                mode="player"
                                currentMode={viewMode}
                                icon={<PlayerViewIcon />}
                                label="Player view (Watch)"
                                onClick={() => setViewMode('player')}
                                hasDropdown={true}
                            />
                        </div>

                        {/* Player placement options - only show when in player mode */}
                        <AnimatePresence>
                            {viewMode === 'player' && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-1 overflow-hidden"
                                >
                                    <div className="w-px h-5 bg-yt-border ml-1" />
                                    <span className="text-xs text-yt-text-secondary mx-1">In:</span>
                                    <PlacementButton
                                        placement="main"
                                        currentPlacement={playerThumbnailPlacement}
                                        label="Player"
                                        onClick={() => setPlayerThumbnailPlacement('main')}
                                    />
                                    <PlacementButton
                                        placement="recommendation"
                                        currentPlacement={playerThumbnailPlacement}
                                        label="Sidebar"
                                        onClick={() => setPlayerThumbnailPlacement('recommendation')}
                                    />
                                    <PlacementButton
                                        placement="both"
                                        currentPlacement={playerThumbnailPlacement}
                                        label="Both"
                                        onClick={() => setPlayerThumbnailPlacement('both')}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="w-px h-5 bg-yt-border" />

                        {/* History controls */}
                        <motion.button
                            onClick={undo}
                            disabled={!canUndo()}
                            className={`p-1.5 rounded-full transition-colors ${canUndo()
                                ? 'hover:bg-yt-dark-hover text-yt-text'
                                : 'text-yt-text-secondary cursor-not-allowed opacity-50'
                                }`}
                            title="Undo"
                            whileHover={canUndo() ? { scale: 1.1 } : {}}
                            whileTap={canUndo() ? { scale: 0.9 } : {}}
                        >
                            <UndoIcon />
                        </motion.button>

                        <div className="text-xs text-yt-text-secondary px-1 min-w-[50px] text-center">
                            {history.length > 0 ? `${historyIndex + 1}/${history.length}` : '0/0'}
                        </div>

                        <motion.button
                            onClick={redo}
                            disabled={!canRedo()}
                            className={`p-1.5 rounded-full transition-colors ${canRedo()
                                ? 'hover:bg-yt-dark-hover text-yt-text'
                                : 'text-yt-text-secondary cursor-not-allowed opacity-50'
                                }`}
                            title="Redo"
                            whileHover={canRedo() ? { scale: 1.1 } : {}}
                            whileTap={canRedo() ? { scale: 0.9 } : {}}
                        >
                            <RedoIcon />
                        </motion.button>

                        <div className="w-px h-5 bg-yt-border" />

                        {/* Export button */}
                        <motion.button
                            onClick={() => setShowExport(true)}
                            className="p-1.5 rounded-full hover:bg-yt-dark-hover text-yt-text-secondary hover:text-green-400 transition-colors"
                            title="Export mockup"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ExportIcon />
                        </motion.button>

                        <motion.button
                            onClick={() => {
                                if (confirm('Reset thumbnail and clear all history?')) {
                                    resetMockVideo();
                                    clearHistory();
                                }
                            }}
                            className="p-1.5 rounded-full hover:bg-red-500/20 text-yt-text-secondary hover:text-red-400 transition-colors"
                            title="Reset all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ResetIcon />
                        </motion.button>

                        <div className="w-px h-5 bg-yt-border" />

                        {/* GitHub link */}
                        <motion.a
                            href="https://github.com/yourusername/mockup-design-youtube"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-yt-dark-hover text-yt-text-secondary hover:text-white transition-colors"
                            title="View on GitHub"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <GitHubIcon />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
