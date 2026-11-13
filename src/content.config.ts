import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const diensten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diensten' }),
  schema: z.object({
    title: z.string(),
    /** Korte naam voor kaarten en menu's */
    shortTitle: z.string(),
    order: z.number(),
    icon: z.enum(['bath', 'flame', 'heatpump', 'fan', 'pipe', 'wrench']),
    /** Eén zin voor de dienstenkaart */
    summary: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string().max(170),
    /** Introductie bovenaan de dienstpagina */
    intro: z.string(),
    ctaLabel: z.string(),
    /** Voorselectie "Type aanvraag" in het formulier */
    requestType: z.enum(['badkamer', 'verwarming', 'warmtepomp', 'ventilatie', 'leidingwerk', 'onderhoud', 'anders']),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    tasksTitle: z.string().default('Wat we voor je doen'),
    tasks: z.array(z.string()),
    benefits: z.array(z.object({ title: z.string(), text: z.string() })),
    /** Optioneel blok met aandachtspunten / veelgestelde afwegingen */
    considerations: z
      .object({ title: z.string(), intro: z.string().optional(), items: z.array(z.string()) })
      .optional(),
    /** Als deze dienst een eigen canonieke pagina buiten /diensten/ heeft */
    canonicalPath: z.string().optional(),
    /** concept = inhoud nog niet door opdrachtgever goedgekeurd */
    status: z.enum(['concept', 'goedgekeurd']).default('concept'),
  }),
});

const projecten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projecten' }),
  schema: z.object({
    title: z.string(),
    /** Gekoppelde dienst(en) */
    services: z.array(reference('diensten')).min(1),
    projectType: z.string(),
    /** Alleen invullen als de klant akkoord is met vermelding */
    region: z.string().optional(),
    summary: z.string(),
    tasks: z.array(z.string()).default([]),
    images: z
      .array(z.object({ file: z.string(), alt: z.string() }))
      .default([]),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    /** Demo-inhoud wordt nooit in productie gebouwd */
    demo: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { diensten, projecten };
