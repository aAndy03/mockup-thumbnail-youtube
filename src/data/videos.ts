import type { Video } from '../lib/schemas';
import { getYouTubeThumbnail } from '../lib/thumbnail';

// TED and educational video IDs
const videoIds = [
    'Ks-_Mh1QhMc', // Your body language shapes who you are - Amy Cuddy
    '8S0FDjFBj8o', // The power of vulnerability - Brené Brown
    'arj7oStGLkU', // 10 ways to have a better conversation - Celeste Headlee

    'TgqiSBxvdws', // How to speak so that people want to listen - Julian Treasure
    'UAWcs5H-qgQ', // The skill of self confidence - Dr. Ivan Joseph


    'Yocja_N5s1I', // How to learn any language in six months - Chris Lonsdale
    'wX78iKhInsc', // The secret to desire in a long-term relationship - Esther Perel
    'fLexgOxsZu0', // The brain in love - Helen Fisher

    'aX7jnVXXG5o', // The power of introverts - Susan Cain
    'QX_oy9614HQ', // What makes a good life? - Robert Waldinger

    '9LZEZ5QuyzM', // The danger of a single story - Chimamanda Ngozi Adichie
    'txjl_Q4jCyQ', // Your brain on porn - Gary Wilson
    'qYvXk_bqlBk', // How to get better at the things you care about - Eduardo Briceño
    'rrkrvAUbU9Y', // The happy secret to better work - Shawn Achor
    'ZFS-zBXKQgM', // How to stay calm when you know you'll be stressed - Daniel Levitin
    'iCvmsMzlF7o', // The power of believing that you can improve - Carol Dweck
    'wQk17RPuhW8', // Inside the mind of a master procrastinator (animated) - Tim Urban
    'qTMl9Hdutqg', // The art of misdirection - Apollo Robbins
    'KxGRhd_iWuE', // Why good leaders make you feel safe - Simon Sinek
];

// Channel names for TED content
const channelNames = [
    'TED', 'TED', 'TED', 'TEDx Talks', 'TED',
    'TEDx Talks', 'TEDx Talks', 'TED', 'TED', 'TEDx Talks',
    'TED', 'TED', 'TED', 'TED', 'TED',
    'TED', 'TED', 'TEDx Talks', 'TED', 'TEDx Talks',
    'TED', 'TED', 'TED', 'TED', 'TED'
];

const titles = [

    'Your body language may shape who you are | Amy Cuddy | TED',
    'The power of vulnerability | Brené Brown | TED',
    '10 ways to have a better conversation | Celeste Headlee | TEDxCreativeCoast',

    'How to speak so that people want to listen | Julian Treasure | TEDxBrighton',
    'The skill of self confidence | Dr. Ivan Joseph | TEDxRyersonU',


    'How to learn any language in six months | Chris Lonsdale | TEDxLingnanUniversity',
    'The secret to desire in a long-term relationship | Esther Perel | TED',
    'The brain in love | Helen Fisher | TED',

    'The power of introverts | Susan Cain | TED',
    'What makes a good life? Lessons from the longest study on happiness | Robert Waldinger | TED',

    'The danger of a single story | Chimamanda Ngozi Adichie | TED',
    'The Great Porn Experiment | Gary Wilson | TEDxGlasgow',
    'How to get better at the things you care about | Eduardo Briceño | TEDxManhattanBeach',
    'The happy secret to better work | Shawn Achor | TEDxBloomington',
    'How to stay calm when you know youll be stressed | Daniel Levitin | TED',
    'The power of believing that you can improve | Carol Dweck | TEDxNorrkoping',
    'Inside the mind of a master procrastinator | Tim Urban (Animated)',
    'The art of misdirection | Apollo Robbins | TED',
    'Why good leaders make you feel safe | Simon Sinek | TED',
];

const views = [
    '78M views', '65M views', '52M views', '48M views', '43M views',
    '41M views', '38M views', '36M views', '35M views', '32M views',
    '31M views', '29M views', '28M views', '27M views', '26M views',
    '24M views', '23M views', '21M views', '19M views', '18M views',
    '17M views', '16M views', '15M views', '14M views', '13M views'
];

const timestamps = [
    '16 years ago', '12 years ago', '14 years ago', '8 years ago', '9 years ago',
    '11 years ago', '10 years ago', '9 years ago', '14 years ago', '11 years ago',
    '22 years ago', '15 years ago', '17 years ago', '12 years ago', '9 years ago',
    '8 years ago', '15 years ago', '12 years ago', '8 years ago', '14 years ago',
    '8 years ago', '9 years ago', '7 years ago', '11 years ago', '10 years ago'
];

const durations = [
    '19:24', '21:03', '20:49', '11:44', '14:04',
    '9:58', '13:23', '6:12', '18:04', '19:27',
    '21:51', '18:37', '21:20', '19:05', '12:46',
    '13:22', '18:33', '16:28', '11:02', '12:20',
    '20:27', '10:20', '14:04', '9:17', '11:59'
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
    verified: true, // All TED channels are verified
}));

// Categories for TED-related content
export const categories = [
    'All',
    'Technology',
    'Science',
    'Psychology',
    'Education',
    'Leadership',
    'Business',
    'Creativity',
    'Self-improvement',
    'Communication',
    'Health',
    'Society',
    'Innovation',
    'Motivation',
    'Neuroscience',
    'Environment',
    'Recently uploaded',
];