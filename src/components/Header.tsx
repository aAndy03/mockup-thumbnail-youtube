import { useState } from 'react';

// YouTube Logo SVG
function YouTubeLogo() {
    return (
        <div className="flex items-center gap-1 cursor-pointer">
            <svg viewBox="0 0 90 20" className="h-5 w-auto">
                <g fill="none">
                    <path
                        d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z"
                        fill="#FF0000"
                    />
                    <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white" />
                </g>
                <text x="32" y="15" fill="#fff" fontSize="14" fontFamily="Roboto, sans-serif" fontWeight="600">
                    Mockup Design - Youtube
                </text>
            </svg>
        </div>
    );
}

// Search Icon
function SearchIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
        </svg>
    );
}

// Microphone Icon
function MicIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
    );
}

// Create Icon (Plus)
function CreateIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2zm3-7H3v12h14v-6.39l4 1.83V8.56l-4 1.83V6m1-1v3.83L22 7v8l-4-1.83V19H2V5h16z" />
        </svg>
    );
}

// Notification Icon
function NotificationIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88V11c0-2.96 1.67-5.47 4-6.32V4c0-1.1.9-2 2-2s2 .9 2 2v.68c2.33.85 4 3.36 4 6.32v4.47l2 1.88zm-2-.35l-2-1.88V11c0-2.47-1.19-4.36-3.13-5.1C12.6 5.77 12.32 5.64 12 5.64s-.6.13-.87.26C9.19 6.64 8 8.53 8 11v4.12L6 17v.35h12V17z" />
        </svg>
    );
}

// Menu Icon (Hamburger)
function MenuIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6H3V5h18v1zm0 6H3v-1h18v1zm0 6H3v-1h18v1z" />
        </svg>
    );
}

export function Header() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-yt-dark flex items-center justify-between px-4 z-50">
            {/* Left section - Menu and Logo */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-yt-dark-hover rounded-full transition-colors">
                    <MenuIcon />
                </button>
                <YouTubeLogo />
            </div>

            {/* Center section - Search */}
            <div className="flex items-center flex-1 max-w-2xl mx-4">
                <div className="flex-1 flex">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-yt-dark border border-yt-border rounded-l-full focus:outline-none focus:border-blue-500 text-yt-text placeholder-yt-text-secondary"
                    />
                    <button className="px-6 py-2 bg-yt-dark-hover border border-l-0 border-yt-border rounded-r-full hover:bg-yt-dark-active transition-colors">
                        <SearchIcon />
                    </button>
                </div>
                <button className="ml-3 p-2 bg-yt-dark-hover rounded-full hover:bg-yt-dark-active transition-colors">
                    <MicIcon />
                </button>
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-yt-dark-hover rounded-full transition-colors">
                    <CreateIcon />
                    <span className="text-sm font-medium">Create</span>
                </button>
                <button className="p-2 hover:bg-yt-dark-hover rounded-full transition-colors">
                    <NotificationIcon />
                </button>
                <button className="ml-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium">
                        U
                    </div>
                </button>
            </div>
        </header>
    );
}
