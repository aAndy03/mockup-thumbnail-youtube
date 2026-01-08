/**
 * Get YouTube thumbnail URL from video ID
 * Tries maxresdefault first, falls back to hqdefault
 */
export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' | 'sd' = 'maxres'): string {
    const qualityMap = {
        maxres: 'maxresdefault',
        hq: 'hqdefault',
        mq: 'mqdefault',
        sd: 'sddefault',
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Extract video ID from YouTube URL
 */
export function extractVideoId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

/**
 * Validate image aspect ratio (16:9 for YouTube thumbnails)
 * Returns { valid: boolean, width: number, height: number, ratio: number }
 */
export async function validateAspectRatio(file: File): Promise<{
    valid: boolean;
    width: number;
    height: number;
    ratio: number;
}> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const ratio = width / height;
            const targetRatio = 16 / 9;
            const tolerance = 0.05; // 5% tolerance
            const valid = Math.abs(ratio - targetRatio) <= tolerance;

            URL.revokeObjectURL(img.src);
            resolve({ valid, width, height, ratio });
        };
        img.onerror = () => {
            resolve({ valid: false, width: 0, height: 0, ratio: 0 });
        };
        img.src = URL.createObjectURL(file);
    });
}

/**
 * Convert file to Base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Compress image to fit within localStorage limits
 * Target size: ~500KB max
 */
export async function compressImage(
    base64: string,
    maxSizeKB: number = 500
): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            // Scale down if image is too large
            const maxDimension = 1280;
            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = (height / width) * maxDimension;
                    width = maxDimension;
                } else {
                    width = (width / height) * maxDimension;
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0, width, height);

            // Start with high quality and reduce if needed
            let quality = 0.9;
            let result = canvas.toDataURL('image/jpeg', quality);

            while (result.length > maxSizeKB * 1024 && quality > 0.1) {
                quality -= 0.1;
                result = canvas.toDataURL('image/jpeg', quality);
            }

            resolve(result);
        };
        img.src = base64;
    });
}

/**
 * Format view count (e.g., 1234567 -> "1.2M views")
 */
export function formatViews(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
}
