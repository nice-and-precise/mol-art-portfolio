import { z, defineCollection } from 'astro:content';

const piecesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    techniques: z.array(z.string()).min(1),
    colors: z.array(z.string()).min(1),
    textures: z.array(z.string()).optional(),
    description: z.string(),
    aiDescription: z.string().optional().default(''),
    featured: z.boolean().default(false),
    mainImage: z.string(),
    detailImages: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  'pieces': piecesCollection,
};
