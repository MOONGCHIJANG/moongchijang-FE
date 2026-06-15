const HEIC_MIME_TYPES = new Set([
  'image/heic',
  'image/heif',
  'image/heic-sequence',
  'image/heif-sequence',
]);

function isHeic(file: File): boolean {
  if (HEIC_MIME_TYPES.has(file.type.toLowerCase())) return true;
  return /\.heic$/i.test(file.name) || /\.heif$/i.test(file.name);
}

export async function convertHeicToJpeg(file: File): Promise<File> {
  if (!isHeic(file)) return file;

  const heic2any = (await import('heic2any')).default;
  const converted = await heic2any({
    blob: file,
    toType: 'image/jpeg',
    quality: 0.85,
  });

  const blob = Array.isArray(converted) ? converted[0] : converted;
  const jpegName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
  return new File([blob], jpegName, { type: 'image/jpeg' });
}
