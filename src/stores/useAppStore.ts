import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MockVideo, HistoryEntry } from '../lib/schemas';

export type ViewMode = 'grid' | 'list' | 'player';
export type PlayerThumbnailPlacement = 'main' | 'recommendation' | 'both';

interface AppState {
    // View mode
    viewMode: ViewMode;
    playerThumbnailPlacement: PlayerThumbnailPlacement;

    // Intro modal
    hasSeenIntro: boolean;

    // Current mock thumbnail data
    mockVideo: MockVideo;

    // History for undo/redo
    history: HistoryEntry[];
    historyIndex: number;

    // Actions
    setViewMode: (mode: ViewMode) => void;
    setPlayerThumbnailPlacement: (placement: PlayerThumbnailPlacement) => void;
    setHasSeenIntro: (seen: boolean) => void;
    setMockVideo: (video: Partial<MockVideo>) => void;
    setThumbnail: (thumbnail: string | null, aspectRatioValid: boolean, width?: number, height?: number) => void;
    undo: () => void;
    redo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
    clearHistory: () => void;
    resetMockVideo: () => void;
}

const defaultMockVideo: MockVideo = {
    title: 'Your Video Title',
    channelName: 'Your Channel',
    customAvatar: null,
    views: '0 views',
    timestamp: 'Just now',
    duration: '0:00',
    customThumbnail: null,
    aspectRatioValid: true,
    originalWidth: undefined,
    originalHeight: undefined,
};

const MAX_HISTORY = 20;

function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            viewMode: 'grid',
            playerThumbnailPlacement: 'both',
            hasSeenIntro: false,
            mockVideo: { ...defaultMockVideo },
            history: [],
            historyIndex: -1,

            setViewMode: (mode) => set({ viewMode: mode }),
            setPlayerThumbnailPlacement: (placement) => set({ playerThumbnailPlacement: placement }),
            setHasSeenIntro: (seen) => set({ hasSeenIntro: seen }),


            setMockVideo: (updates) => {
                const state = get();
                const newMockVideo = { ...state.mockVideo, ...updates };

                // Add to history
                const newEntry: HistoryEntry = {
                    id: generateId(),
                    timestamp: Date.now(),
                    mockVideo: { ...newMockVideo },
                };

                // Trim future history if we're not at the end
                const newHistory = [
                    ...state.history.slice(0, state.historyIndex + 1),
                    newEntry,
                ].slice(-MAX_HISTORY);

                set({
                    mockVideo: newMockVideo,
                    history: newHistory,
                    historyIndex: newHistory.length - 1,
                });
            },

            setThumbnail: (thumbnail, aspectRatioValid, width, height) => {
                get().setMockVideo({
                    customThumbnail: thumbnail,
                    aspectRatioValid,
                    originalWidth: width,
                    originalHeight: height,
                });
            },

            undo: () => {
                const state = get();
                if (state.historyIndex > 0) {
                    const newIndex = state.historyIndex - 1;
                    set({
                        historyIndex: newIndex,
                        mockVideo: { ...state.history[newIndex].mockVideo },
                    });
                }
            },

            redo: () => {
                const state = get();
                if (state.historyIndex < state.history.length - 1) {
                    const newIndex = state.historyIndex + 1;
                    set({
                        historyIndex: newIndex,
                        mockVideo: { ...state.history[newIndex].mockVideo },
                    });
                }
            },

            canUndo: () => get().historyIndex > 0,
            canRedo: () => get().historyIndex < get().history.length - 1,

            clearHistory: () => {
                set({
                    history: [],
                    historyIndex: -1,
                });
            },

            resetMockVideo: () => {
                get().setMockVideo({ ...defaultMockVideo });
            },
        }),
        {
            name: 'youtube-thumbnail-preview',
        }
    )
);
