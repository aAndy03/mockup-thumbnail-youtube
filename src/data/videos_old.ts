import type { Video } from '../lib/schemas';
import { getYouTubeThumbnail } from '../lib/thumbnail';

// Sample YouTube video IDs - replace with user-provided ones
const videoIds = [
    'dQw4w9WgXcQ', // Rick Astley
    'jNQXAC9IVRw', // Me at the zoo
    '9bZkp7q19f0', // PSY - Gangnam Style
    'kJQP7kiw5Fk', // Luis Fonsi - Despacito
    'RgKAFK5djSk', // Wiz Khalifa - See You Again
    'OPf0YbXqDm0', // Mark Ronson - Uptown Funk
    'JGwWNGJdvx8', // Ed Sheeran - Shape of You
    'fRh_vgS2dFE', // Justin Bieber - Sorry
    'CevxZvSJLk8', // Katy Perry - Roar
    'e-ORhEE9VVg', // Taylor Swift - Blank Space
    'hT_nvWreIhg', // OneRepublic - Counting Stars
    'YQHsXMglC9A', // Adele - Hello
    'pRpeEdMmmQ0', // Shakira - Waka Waka
    '09R8_2nJtjg', // Maroon 5 - Sugar
    'nfWlot6h_JM', // Tyler the Creator - See You Again
];

// Generate video data from IDs
const channelNames = [
    'Rick Astley', 'jawed', 'officialpsy', 'Luis Fonsi', 'Wiz Khalifa',
    'Mark Ronson', 'Ed Sheeran', 'Justin Bieber', 'Katy Perry', 'Taylor Swift',
    'OneRepublic', 'Adele', 'Shakira', 'Maroon 5', 'Tyler The Creator'
];

const titles = [
    'Never Gonna Give You Up (Official Video)',
    'Me at the zoo',
    'PSY - GANGNAM STYLE(강남스타일) M/V',
    'Luis Fonsi - Despacito ft. Daddy Yankee',
    'Wiz Khalifa - See You Again ft. Charlie Puth',
    'Mark Ronson - Uptown Funk ft. Bruno Mars',
    'Ed Sheeran - Shape of You [Official Video]',
    'Justin Bieber - Sorry (Official Video)',
    'Katy Perry - Roar (Official)',
    'Taylor Swift - Blank Space',
    'OneRepublic - Counting Stars (Official Music Video)',
    'Adele - Hello (Official Music Video)',
    'Shakira - Waka Waka (This Time for Africa)',
    'Maroon 5 - Sugar (Official Music Video)',
    'Tyler, The Creator - See You Again ft. Kali Uchis',
];

const views = [
    '1.5B views', '330M views', '5.1B views', '8.4B views', '6.2B views',
    '4.9B views', '6.3B views', '3.8B views', '3.6B views', '3.2B views',
    '3.9B views', '3.3B views', '2.1B views', '4.1B views', '890M views'
];

const timestamps = [
    '14 years ago', '19 years ago', '12 years ago', '8 years ago', '9 years ago',
    '10 years ago', '8 years ago', '9 years ago', '11 years ago', '10 years ago',
    '11 years ago', '9 years ago', '14 years ago', '10 years ago', '6 years ago'
];

const durations = [
    '3:33', '0:19', '4:13', '4:42', '4:03',
    '4:31', '4:24', '3:26', '4:30', '4:33',
    '4:44', '6:07', '3:31', '5:02', '3:00'
];

export const videos: Video[] = videoIds.map((id, index) => ({
    id,
    title: titles[index],
    channelName: channelNames[index],
    channelAvatar: `https://i.pravatar.cc/100?u=${channelNames[index].replace(/\s/g, '')}`,
    views: views[index],
    timestamp: timestamps[index],
    thumbnailUrl: getYouTubeThumbnail(id),
    duration: durations[index],
    verified: index < 10, // First 10 are verified
}));

// Categories for the pills
export const categories = [
    'All',
    'Gaming',
    'Music',
    'Podcasts',
    'Display devices',
    'Operating systems',
    'Computer-generated imagery',
    'Visual Effects',
    'AI',
    'Mixes',
    'Mods',
    'Game engines',
    'Graphics processing',
    'Live',
    'Comedy',
    'News',
    'Recently uploaded',
];
