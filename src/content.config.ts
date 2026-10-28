import {defineCollection} from 'astro:content';
import {file, glob} from 'astro/loaders';
import {z} from 'astro/zod';

/**
 * The blog ("News" on the site): one Markdown file per post in
 * `src/content/blog/`. The file name is the URL (`hello-world.md` →
 * `/blog/hello-world/`). Front matter is checked at build time: a missing
 * title or a bad date fails the build with the file name, before anything
 * goes live.
 */
const blog = defineCollection({
  loader: glob({pattern: '**/*.md', base: './src/content/blog'}),
  schema: ({image}) =>
    z.object({
      title: z.string().min(1).max(120),
      /** One or two sentences: the list, the meta description, social cards. */
      description: z.string().min(1).max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string().max(80).optional(),
      /**
       * The cover (1200×630 or larger, 16:9-ish), one of:
       *   - a file in `src/assets/` relative to the post (`../../assets/blog/post.jpg`):
       *     optimised at build (AVIF/WebP, several widths). PREFERRED;
       *   - a path in `public/` (`/images/post.webp`), served as committed;
       *   - an https URL (an image CDN).
       */
      cover: z
        .union([
          z.string().regex(/^(\/[^/]|https:\/\/)/, 'Use ./ or ../ for src/assets, a /path in public/ or an https:// URL.'),
          image(),
        ])
        .optional(),
      coverAlt: z.string().max(200).default(''),
      /** Lowercase words; each gets a page at `/blog/tags/<tag>/`. */
      tags: z.array(z.string().min(1).max(40)).max(10).default([]),
      /** `true`: built in `npm run dev` only, never published. */
      draft: z.boolean().default(false),
    }),
});

/**
 * The menu: `src/content/menu.json`, one entry per dish, shown on /menu/ in
 * the order of the file within each section. `sample: true` marks a dish or
 * price written for the first version (shown with a "sample" flag in the
 * Preview only, never on the live site): confirm it, then remove the flag.
 */
const menu = defineCollection({
  loader: file('src/content/menu.json'),
  schema: ({image}) =>
    z.object({
      section: z.enum(['breakfast', 'mains', 'drinks', 'bakes', 'sides']),
      name: z.string().min(1).max(80),
      description: z.string().max(160),
      /** In taka, a whole number. */
      price: z.number().int().positive(),
      tags: z.array(z.enum(['veg', 'spicy', 'gf'])).default([]),
      /** One per section: highlighted at the top of it. */
      chefsPick: z.boolean().default(false),
      photo: image().optional(),
      photoAlt: z.string().max(200).default(''),
      sample: z.boolean().default(false),
    }),
});

/** The team on /about/: `src/content/team.json`. */
const team = defineCollection({
  loader: file('src/content/team.json'),
  schema: ({image}) =>
    z.object({
      name: z.string().min(1).max(40),
      role: z.string().min(1).max(60),
      fact: z.string().max(160),
      photo: image(),
      photoAlt: z.string().max(200),
    }),
});

/** The gallery on /gallery/: `src/content/gallery.json`, in the order shown. */
const gallery = defineCollection({
  loader: file('src/content/gallery.json'),
  schema: ({image}) =>
    z.object({
      category: z.enum(['food', 'space', 'people', 'events']),
      photo: image(),
      alt: z.string().min(1).max(200),
      /** The crop: tall, wide or square, for the masonry rhythm. */
      shape: z.enum(['portrait', 'landscape', 'square']).default('landscape'),
    }),
});

export const collections = {blog, menu, team, gallery};
