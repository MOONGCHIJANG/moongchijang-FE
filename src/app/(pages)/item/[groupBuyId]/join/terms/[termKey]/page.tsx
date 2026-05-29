'use client';

import { useParams, notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/Button';
import { useTermsSheetStore } from '@/store/termsSheetStore';
import { TERMS_CONTENT, ROUTE_TO_TERM_KEY } from '../../_data/terms';

export default function TermsDetailPage() {
  const { termKey } = useParams<{ termKey: string }>();
  const router = useRouter();
  const checkTerm = useTermsSheetStore((s) => s.checkTerm);

  useEffect(() => {
    const key = ROUTE_TO_TERM_KEY[termKey];
    if (key) checkTerm(key);
  }, [termKey, checkTerm]);

  const content = TERMS_CONTENT[termKey];
  if (!content) notFound();

  return (
    <div className="min-h-dvh bg-bg-white-muted flex flex-col">
      <Header text="유의사항" />

      <div className="flex-1 overflow-y-auto px-6 py-4 pb-28 flex flex-col gap-4">
        <div className="border border-border-subtle rounded-2xlarge p-4 flex flex-col gap-2 bg-bg-white">
          <p className="body-md-bold">{content.title}</p>
          <div className="flex flex-col gap-1">
            {content.bullets.map((bullet, i) => (
              <p key={i} className="text-text-primary text-sm leading-5">
                {' • '}
                {bullet}
              </p>
            ))}
          </div>
        </div>

        {content.legalText && (
          <p className="text-text-primary text-sm leading-5 whitespace-pre-line">
            {content.legalText}
          </p>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-110 p-4">
        <Button
          variant="black"
          size="lg"
          fullWidth
          onClick={() => router.back()}
        >
          확인했어요
        </Button>
      </div>
    </div>
  );
}
