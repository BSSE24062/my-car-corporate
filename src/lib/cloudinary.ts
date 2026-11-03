import type { ImageLoaderProps } from 'next/image';

const NEXT_ALLOWED_WIDTHS = [
  32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
];

function snapToAllowedWidth(width: number): number {
  for (const w of NEXT_ALLOWED_WIDTHS) {
    if (w >= width) return w;
  }
  return NEXT_ALLOWED_WIDTHS[NEXT_ALLOWED_WIDTHS.length - 1];
}

/**
 * Deterministically converts a local `/public` asset path (e.g. `/Fleet/benz s class.jpg`)
 * into a clean Cloudinary `public_id` (e.g. `elite-cars/Fleet/benz_s_class`).
 * Must stay in sync with `scripts/upload-to-cloudinary.mjs`.
 */
export function toCloudinaryPublicId(
  localSrc: string,
  folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'elite-cars'
): string {
  const cleanSrc = decodeURIComponent(localSrc.split('?')[0].split('#')[0])
    .replace(/\\/g, '/')
    .replace(/^\/+/, '');

  // Strip image extension (.jpg, .jpeg, .png, .avif, .webp, .gif)
  const withoutExt = cleanSrc.replace(/\.(jpe?g|png|avif|webp|gif)$/i, '');

  // Replace whitespace and unsafe characters with underscores
  const normalized = withoutExt
    .split('/')
    .map((segment) => segment.trim().replace(/\s+/g, '_'))
    .filter(Boolean)
    .join('/');

  const cleanFolder = folder.trim().replace(/^\/+|\/+$/g, '');
  return cleanFolder ? `${cleanFolder}/${normalized}` : normalized;
}

export interface CldUrlOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  crop?: 'limit' | 'fill' | 'fit' | 'scale';
}

export const DEFAULT_CLOUDINARY_CLOUD_NAME = 'y9pgtomt';

/**
 * Generates an optimized Cloudinary CDN URL (`f_auto,q_auto`) using Cloudinary Edge CDN.
 */
export function cldUrl(src: string, options: CldUrlOptions = {}): string {
  if (!src) return '';

  // Already an external URL
  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  const cloudName = (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CLOUD_NAME
  ).trim();
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'elite-cars';

  if (cloudName) {
    const publicId = toCloudinaryPublicId(src, folder);
    const transforms: string[] = ['f_auto'];

    if (!options.quality || options.quality === 'auto') {
      transforms.push('q_auto');
    } else {
      transforms.push(`q_${options.quality}`);
    }

    transforms.push(`c_${options.crop || 'limit'}`);

    if (options.width) {
      transforms.push(`w_${Math.round(options.width)}`);
    }
    if (options.height) {
      transforms.push(`h_${Math.round(options.height)}`);
    }

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${publicId}`;
  }

  // Fallback before Cloudinary Cloud Name is set: use Next.js built-in AVIF/WebP optimizer
  const normalizedPath = src.startsWith('/') ? src : `/${src}`;
  const width = snapToAllowedWidth(options.width || 1200);
  const quality = options.quality === 85 ? 85 : 75;
  return `/_next/image?url=${encodeURIComponent(normalizedPath)}&w=${width}&q=${quality}`;
}

/**
 * Custom loader for `next/image` `<Image loader={cloudinaryLoader} ... />`.
 * Delivers directly from Cloudinary's global Edge CDN in AVIF/WebP when configured.
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  return cldUrl(src, {
    width,
    quality: quality || 'auto',
    crop: 'limit',
  });
}

/**
 * Helper for responsive CSS custom properties (`--bg-desktop` and `--bg-mobile`).
 */
export function cldBgVars(
  desktopSrc: string,
  mobileSrc?: string,
  desktopWidth = 1920,
  mobileWidth = 828
): Record<string, string> {
  const desktopUrl = cldUrl(desktopSrc, { width: desktopWidth });
  const mobileUrl = cldUrl(mobileSrc || desktopSrc, { width: mobileWidth });

  return {
    '--bg-desktop': `url("${desktopUrl}")`,
    '--bg-mobile': `url("${mobileUrl}")`,
  };
}

/**
 * Helper for OpenGraph / Twitter / Schema.org metadata URLs.
 */
export function cldOgUrl(src: string, baseUrl = 'https://www.elitecarsaustralia.com.au'): string {
  const cloudName = (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CLOUD_NAME
  ).trim();
  if (cloudName) {
    return cldUrl(src, { width: 1200, height: 630, crop: 'fill' });
  }
  const normalizedPath = src.startsWith('/') ? src : `/${src}`;
  return `${baseUrl}${encodeURI(normalizedPath)}`;
}

