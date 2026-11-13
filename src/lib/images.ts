import type { ImageMetadata } from 'astro';

/** Alle beschikbare foto's in src/assets/images (wordt bij de build ingelezen). */
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function findImage(path: string): ImageMetadata | null {
  const mod = files[`/src/assets/images/${path}`];
  return mod?.default ?? null;
}
