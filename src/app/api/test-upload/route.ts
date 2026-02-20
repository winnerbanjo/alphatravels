export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  buildSignedUploadParams,
} from '@/src/lib/cloudinary';
import { success, error } from '@/src/lib/api-response';

/**
 * GET - Verifies Cloudinary API Key and Secret are correctly loaded from .env.local.
 * DELETE THIS FILE after verification.
 */
export async function GET(request: NextRequest) {
  try {
    const cloudName = CLOUDINARY_CLOUD_NAME;
    const hasKey = Boolean(process.env.CLOUDINARY_API_KEY ?? CLOUDINARY_API_KEY);
    const hasSecret = Boolean(process.env.CLOUDINARY_API_SECRET);

    const keySource = process.env.CLOUDINARY_API_KEY ? 'env' : 'default';
    const secretSource = process.env.CLOUDINARY_API_SECRET ? 'env' : 'default';

    const signatureTest = buildSignedUploadParams({ folder: 'greenlife-uploads' });

    return success({
      cloudName,
      cloudNameExpected: 'do4mbqgjn',
      cloudNameOk: cloudName === 'do4mbqgjn',
      apiKeySet: hasKey,
      apiKeySource: keySource,
      apiSecretSet: hasSecret,
      apiSecretSource: secretSource,
      signatureTest: {
        hasSignature: Boolean(signatureTest.signature),
        timestamp: signatureTest.timestamp,
      },
      message: hasKey && hasSecret && cloudName === 'do4mbqgjn'
        ? 'Cloudinary config OK. Delete this route after check.'
        : 'Set CLOUDINARY_* in .env.local and ensure cloud name is do4mbqgjn.',
    });
  } catch (err) {
    console.error('Test upload check error:', err);
    return error(err instanceof Error ? err.message : 'Check failed', 500);
  }
}
