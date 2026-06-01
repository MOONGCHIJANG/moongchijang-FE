'use client';

import { useEffect, useRef, useState } from 'react';
import { ImageUploadCategory } from '@/api/generated/api.schemas';
import { usePostApiV1ImagesPresignedUrls } from '@/api/hooks/image-upload/image-upload';
import { convertHeicToJpeg } from '../_utils/convertHeic';

export const MAX_IMAGES = 10;

export type ImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  key: string | null;
  status: 'uploading' | 'done' | 'error';
};

export function useImageUpload() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<ImageItem[]>([]);
  imagesRef.current = images;

  const { mutateAsync: getPresignedUrls } = usePostApiV1ImagesPresignedUrls();

  // 언마운트 시 남은 previewUrl 전체 해제
  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    };
  }, []);

  const markIds = (ids: string[], status: ImageItem['status']) =>
    setImages((prev) =>
      prev.map((img) => (ids.includes(img.id) ? { ...img, status } : img)),
    );

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const toAdd = files.slice(0, MAX_IMAGES - images.length);
    e.target.value = '';
    if (toAdd.length === 0) return;

    // HEIC 변환 실패한 파일은 원본 유지
    const converted = await Promise.all(
      toAdd.map((file) => convertHeicToJpeg(file).catch(() => file)),
    );

    const newItems: ImageItem[] = converted.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      key: null,
      status: 'uploading',
    }));

    setImages((prev) => [...prev, ...newItems]);

    try {
      const res = await getPresignedUrls({
        data: {
          groupBuyId: null,
          files: converted.map((file) => ({
            category: ImageUploadCategory.PRODUCT,
            fileName: file.name,
            contentType: file.type,
          })),
        },
      });

      if (res.status !== 200) {
        markIds(
          newItems.map((i) => i.id),
          'error',
        );
        return;
      }

      const presignedItems = res.data.data.items;
      const isMock = process.env.NEXT_PUBLIC_API_MODE === 'mock';

      await Promise.all(
        converted.map(async (file, idx) => {
          const presigned = presignedItems[idx];
          const newItem = newItems[idx];
          if (!presigned || !newItem) return;
          try {
            if (!isMock) {
              const s3Res = await fetch(presigned.uploadUrl, {
                method: presigned.method,
                body: file,
                headers: { 'Content-Type': file.type },
              });
              if (!s3Res.ok)
                throw new Error(`S3 upload failed: ${s3Res.status}`);
            }
            setImages((prev) =>
              prev.map((img) =>
                img.id === newItem.id
                  ? { ...img, key: presigned.key, status: 'done' }
                  : img,
              ),
            );
          } catch {
            setImages((prev) =>
              prev.map((img) =>
                img.id === newItem.id ? { ...img, status: 'error' } : img,
              ),
            );
          }
        }),
      );
    } catch {
      markIds(
        newItems.map((i) => i.id),
        'error',
      );
    }
  };

  const handleRemove = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const uploadedKeys = images
    .filter(
      (img): img is ImageItem & { key: string } =>
        img.status === 'done' && img.key !== null,
    )
    .map((img) => img.key);

  const isUploading = images.some((img) => img.status === 'uploading');

  return {
    images,
    fileInputRef,
    handleAdd,
    handleRemove,
    uploadedKeys,
    isUploading,
    canAdd: images.length < MAX_IMAGES,
  };
}
