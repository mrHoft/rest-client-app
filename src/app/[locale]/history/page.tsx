import { lazy, Suspense } from 'react';
import Loading from '~/components/loader/loading';
import type { Locale } from '~/i18n-config';
import { getDictionary } from '../dictionaries';

const History = lazy(() => import('~/widgets/history/history'));

export default async function PageHistory({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <History dict={dict.History} locale={locale} />
      </Suspense>
    </>
  );
}
