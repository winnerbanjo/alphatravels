export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { buildSignedUploadParams } from '@/src/lib/cloudinary';
import { success, error } from '@/src/lib/api-response';

/**
 * GET - Return secure Cloudinary upload signature for client-side uploads (receipts/avatars).
 * Query: folder (optional), upload_preset (optional).
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || undefined;
    const upload_preset = searchParams.get('upload_preset') || undefined;
    const params = buildSignedUploadParams({ folder, upload_preset });
    return success(params);
  } catch (err) {
    console.error('Cloudinary signature error:', err);
    return error(err instanceof Error ? err.message : 'Signature failed', 500);
  }
}
