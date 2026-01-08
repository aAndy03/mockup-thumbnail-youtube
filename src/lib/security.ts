// Security configuration for the app
// Note: This is a client-only app, but we still implement best practices

export const SECURITY_CONFIG = {
    // Content Security Policy headers (for deployment)
    csp: {
        'default-src': ["'self'"],
        'img-src': ["'self'", 'https://i.ytimg.com', 'https://i.pravatar.cc', 'data:', 'blob:'],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'script-src': ["'self'"],
        'connect-src': ["'self'"],
        'frame-ancestors': ["'none'"],
        'form-action': ["'self'"],
        'base-uri': ["'self'"],
    },

    // Privacy features
    privacy: {
        noTracking: true,
        noCookies: true,
        noExternalRequests: false, // We do fetch YouTube thumbnails
        localStorage: true, // We use localStorage for persistence
        noAnalytics: true,
    },

    // App info
    version: '1.0.0',
    name: 'Mockup Design - YouTube',
    description: 'Preview your YouTube thumbnails in context before uploading',
    author: 'Your Name',
    repository: 'https://github.com/yourusername/mockup-design-youtube',
    license: 'MIT',
};

// Generate CSP header string
export function generateCSPHeader(): string {
    const directives = Object.entries(SECURITY_CONFIG.csp)
        .map(([key, values]) => `${key} ${values.join(' ')}`)
        .join('; ');
    return directives;
}

// Sanitize user input (for title/channel name)
export function sanitizeInput(input: string, maxLength = 100): string {
    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>'"]/g, '') // Remove potential XSS characters
        .trim()
        .slice(0, maxLength);
}

// Validate Base64 image data
export function isValidBase64Image(data: string): boolean {
    if (!data) return false;
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/;
    return base64Regex.test(data);
}

// Check if running in secure context
export function isSecureContext(): boolean {
    return window.isSecureContext ?? window.location.protocol === 'https:';
}

// Safely parse JSON from localStorage
export function safeJSONParse<T>(data: string | null, fallback: T): T {
    if (!data) return fallback;
    try {
        return JSON.parse(data) as T;
    } catch {
        return fallback;
    }
}
