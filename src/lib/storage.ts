const STORAGE_KEY = 'youtube-thumbnail-preview';
const MAX_HISTORY_SIZE = 20;
const MAX_STORAGE_MB = 4; // Leave some buffer below 5MB limit

interface StorageData {
    mockVideo: import('./schemas').MockVideo | null;
    history: import('./schemas').HistoryEntry[];
    historyIndex: number;
}

/**
 * Get stored data from localStorage
 */
export function getStoredData(): StorageData | null {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        return JSON.parse(data);
    } catch {
        return null;
    }
}

/**
 * Save data to localStorage with size management
 */
export function saveStoredData(data: StorageData): boolean {
    try {
        const serialized = JSON.stringify(data);
        const sizeMB = new Blob([serialized]).size / (1024 * 1024);

        if (sizeMB > MAX_STORAGE_MB) {
            // Trim history if too large
            const trimmedData = {
                ...data,
                history: data.history.slice(-Math.floor(MAX_HISTORY_SIZE / 2)),
                historyIndex: Math.min(data.historyIndex, data.history.length - 1),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedData));
        } else {
            localStorage.setItem(STORAGE_KEY, serialized);
        }
        return true;
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        return false;
    }
}

/**
 * Clear all stored data
 */
export function clearStoredData(): void {
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get current storage usage
 */
export function getStorageUsage(): { usedMB: number; maxMB: number; percentage: number } {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const usedMB = data ? new Blob([data]).size / (1024 * 1024) : 0;
        return {
            usedMB: parseFloat(usedMB.toFixed(2)),
            maxMB: MAX_STORAGE_MB,
            percentage: parseFloat(((usedMB / MAX_STORAGE_MB) * 100).toFixed(1)),
        };
    } catch {
        return { usedMB: 0, maxMB: MAX_STORAGE_MB, percentage: 0 };
    }
}
