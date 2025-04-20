'use client';

import Error from '~/components/error/error';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <Error error={error} reset={reset} />;
}
