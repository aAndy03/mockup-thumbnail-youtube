import { motion } from 'framer-motion';

// Icons for sidebar
function HomeIcon({ active }: { active?: boolean }) {
    return active ? (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z" />
        </svg>
    ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.33l7 6.12V20h-4v-6H9v6H5v-9.55l7-6.12M12 3 4 10v11h6v-6h4v6h6V10l-8-7z" />
        </svg>
    );
}

function ShortsIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z" />
        </svg>
    );
}

function SubscriptionsIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 20V10h18v10H3z" />
        </svg>
    );
}

function HistoryIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3 7.5V11h3.5l-2.19-2.19c.1-.17.2-.34.3-.51C6.18 5.73 8.83 4 12 4c4.96 0 9 4.04 9 9h1z" />
        </svg>
    );
}

function PlaylistIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l6 4-6 4z" />
        </svg>
    );
}

function WatchLaterIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
        </svg>
    );
}

function LikedIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3v8zm12.98-7.63-1.34 6c-.07.29-.34.48-.64.48H8v-8.61l5.6-6.06c.13-.14.28-.2.46-.2.26 0 .5.21.57.49L12.8 11h6.13c.36 0 .52.23.57.36.05.13.09.39-.52.01z" />
        </svg>
    );
}

function YourVideosIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="m10 8 6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z" />
        </svg>
    );
}

function DownloadsIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z" />
        </svg>
    );
}

function MusicIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z" />
        </svg>
    );
}

function GamingIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 12H8v2H6v-2H4v-2h2V8h2v2h2v2zm7 .5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm3-3c0-.83-.67-1.5-1.5-1.5S17 8.67 17 9.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5zm-3.5-4.5c-1.72 0-3.3.71-4.5 1.85C10.8 5.71 9.22 5 7.5 5A6.5 6.5 0 0 0 1 11.5c0 3.33 2.46 6.11 5.74 6.47.54.06 1.08-.15 1.47-.54l.79-.79c.4-.4.94-.62 1.5-.62h3c.56 0 1.1.22 1.5.62l.79.79c.4.4.93.6 1.47.54 3.28-.36 5.74-3.14 5.74-6.47 0-3.59-2.91-6.5-6.5-6.5zm5.46 11.38-.79-.79C20.86 14.78 20.01 14.5 19.13 14.5h-3c-.88 0-1.73.28-2.44.59l-.79.79c-.2.2-.46.31-.74.27-2.33-.25-4.16-2.22-4.16-4.65 0-2.49 2.01-4.5 4.5-4.5 1.37 0 2.64.61 3.5 1.62l.5.55.5-.55c.86-1.01 2.13-1.62 3.5-1.62 2.49 0 4.5 2.01 4.5 4.5 0 2.43-1.83 4.4-4.16 4.65-.28.04-.54-.07-.74-.27z" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z" />
        </svg>
    );
}

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    delay?: number;
}

function SidebarItem({ icon, label, active, delay = 0 }: SidebarItemProps) {
    return (
        <motion.button
            className={`w-full flex items-center gap-6 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-yt-dark-hover' : 'hover:bg-yt-dark-hover'
                }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.03, duration: 0.2 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
        >
            {icon}
            <span className={`text-sm ${active ? 'font-medium' : ''}`}>{label}</span>
        </motion.button>
    );
}

interface SubscriptionItemProps {
    name: string;
    avatar: string;
    live?: boolean;
    notifications?: number;
    delay?: number;
}

function SubscriptionItem({ name, avatar, live, notifications, delay = 0 }: SubscriptionItemProps) {
    return (
        <motion.button
            className="w-full flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-yt-dark-hover transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.03, duration: 0.2 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
        >
            <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
            >
                <img
                    src={avatar}
                    alt={name}
                    className="w-6 h-6 rounded-full object-cover"
                />
                {live && (
                    <motion.div
                        className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-yt-dark"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                )}
            </motion.div>
            <span className="text-sm flex-1 text-left truncate">{name}</span>
            {notifications && notifications > 0 && (
                <motion.span
                    className="text-xs text-yt-text-secondary bg-yt-dark-active px-1.5 py-0.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay * 0.03 + 0.2, type: 'spring' }}
                >
                    {notifications}
                </motion.span>
            )}
        </motion.button>
    );
}

export function Sidebar() {
    const subscriptions = [
        { name: 'Get.factual', avatar: 'https://i.pravatar.cc/100?u=1', notifications: 14 },
        { name: 'National Geographic', avatar: 'https://i.pravatar.cc/100?u=2', notifications: 11 },
        { name: '2BeLikeChrist', avatar: 'https://i.pravatar.cc/100?u=3' },
        { name: '2swap', avatar: 'https://i.pravatar.cc/100?u=4' },
        { name: '3Blue1Brown', avatar: 'https://i.pravatar.cc/100?u=5' },
        { name: '20 Minute University', avatar: 'https://i.pravatar.cc/100?u=6' },
        { name: 'A Cappella Hymns', avatar: 'https://i.pravatar.cc/100?u=7' },
    ];

    return (
        <motion.aside
            className="fixed left-0 top-14 bottom-0 w-60 bg-yt-dark overflow-y-auto overflow-x-hidden scrollbar-hide py-3 px-3 z-40"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            {/* Main Navigation */}
            <div className="pb-3 border-b border-yt-border">
                <SidebarItem icon={<HomeIcon active />} label="Home" active delay={0} />
                <SidebarItem icon={<ShortsIcon />} label="Shorts" delay={1} />
                <SidebarItem icon={<SubscriptionsIcon />} label="Subscriptions" delay={2} />
            </div>

            {/* You Section */}
            <div className="py-3 border-b border-yt-border">
                <motion.button
                    className="flex items-center gap-1 px-3 py-2"
                    whileHover={{ x: 2 }}
                >
                    <span className="text-base font-medium">You</span>
                    <ChevronIcon />
                </motion.button>
                <SidebarItem icon={<HistoryIcon />} label="History" delay={3} />
                <SidebarItem icon={<PlaylistIcon />} label="Playlists" delay={4} />
                <SidebarItem icon={<WatchLaterIcon />} label="Watch Later" delay={5} />
                <SidebarItem icon={<LikedIcon />} label="Liked videos" delay={6} />
                <SidebarItem icon={<YourVideosIcon />} label="Your videos" delay={7} />
                <SidebarItem icon={<DownloadsIcon />} label="Downloads" delay={8} />
            </div>

            {/* Subscriptions */}
            <div className="py-3 border-b border-yt-border">
                <motion.h3
                    className="px-3 py-2 text-base font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Subscriptions
                </motion.h3>
                {subscriptions.map((sub, index) => (
                    <SubscriptionItem key={sub.name} {...sub} delay={9 + index} />
                ))}
                <motion.button
                    className="w-full flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-yt-dark-hover transition-colors text-yt-text-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ x: 4 }}
                >
                    <ChevronIcon />
                    <span className="text-sm">Show more</span>
                </motion.button>
            </div>

            {/* Explore */}
            <div className="py-3">
                <motion.h3
                    className="px-3 py-2 text-base font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    Explore
                </motion.h3>
                <SidebarItem icon={<MusicIcon />} label="Music" delay={16} />
                <SidebarItem icon={<GamingIcon />} label="Gaming" delay={17} />
            </div>
        </motion.aside>
    );
}
