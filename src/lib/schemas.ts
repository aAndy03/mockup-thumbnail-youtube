import { z } from 'zod';

// Schema for a YouTube video
export const VideoSchema = z.object({
    id: z.string(),
    title: z.string(),
    channelName: z.string(),
    channelAvatar: z.string().url().optional(),
    views: z.string(),
    timestamp: z.string(),
    thumbnailUrl: z.string(),
    duration: z.string(),
    verified: z.boolean().optional(),
});

export type Video = z.infer<typeof VideoSchema>;

// Schema for the mock video with custom thumbnail
export const MockVideoSchema = z.object({
    title: z.string().default('Your Video Title'),
    channelName: z.string().default('Your Channel'),
    customAvatar: z.string().nullable().default(null), // Base64 data URL for avatar
    views: z.string().default('0 views'),
    timestamp: z.string().default('Just now'),
    duration: z.string().default('0:00'),
    customThumbnail: z.string().nullable(), // Base64 data URL
    aspectRatioValid: z.boolean().default(true),
    originalWidth: z.number().optional(),
    originalHeight: z.number().optional(),
});

export type MockVideo = z.infer<typeof MockVideoSchema>;

// Schema for history entry
export const HistoryEntrySchema = z.object({
    id: z.string(),
    timestamp: z.number(),
    mockVideo: MockVideoSchema,
});

export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;
