/**
 * Cloudinary asset handshake – production cloud: do4mbqgjn.
 * Avatars/receipts from folder: greenlife-uploads.
 * Use env for secrets; defaults below are for wiring only (set in .env).
 */
import crypto from 'crypto';

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'do4mbqgjn';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '559518252881535';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '6QqsQvDaSPxTgludFqBc9TN9U6S';

export const CLOUDINARY_UPLOAD_FOLDER = 'greenlife-uploads';

/** Base URL for delivery: https://res.cloudinary.com/do4mbqgjn/... */
export function getCloudinaryBaseUrl(): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;
}

/** Build full image URL for a path in greenlife-uploads (e.g. for Merchant avatar_url). */
export function getCloudinaryImageUrl(publicId: string, options?: { folder?: string }): string {
  const folder = options?.folder ?? CLOUDINARY_UPLOAD_FOLDER;
  const id = publicId.startsWith(folder) ? publicId : `${folder}/${publicId}`;
  return `${getCloudinaryBaseUrl()}/image/upload/${id}`;
}

export interface CloudinarySignatureParams {
  folder?: string;
  upload_preset?: string;
  timestamp?: number;
  [key: string]: string | number | undefined;
}

export function getCloudinaryUploadSignature(params: CloudinarySignatureParams): {
  signature: string;
  timestamp: number;
  cloudName: string;
} {
  const timestamp = params.timestamp ?? Math.floor(Date.now() / 1000);
  const sortedKeys = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== '')
    .sort();
  const toSign = sortedKeys.map((k) => `${k}=${params[k]}`).join('&');
  const signature = CLOUDINARY_API_SECRET
    ? crypto.createHash('sha1').update(toSign + CLOUDINARY_API_SECRET).digest('hex')
    : '';

  return {
    signature,
    timestamp,
    cloudName: CLOUDINARY_CLOUD_NAME,
  };
}

export function buildSignedUploadParams(options: { folder?: string; upload_preset?: string }) {
  const folder = options.folder ?? CLOUDINARY_UPLOAD_FOLDER;
  const params: CloudinarySignatureParams = {
    timestamp: Math.floor(Date.now() / 1000),
    folder,
    ...(options.upload_preset && { upload_preset: options.upload_preset }),
  };
  return getCloudinaryUploadSignature(params);
}
