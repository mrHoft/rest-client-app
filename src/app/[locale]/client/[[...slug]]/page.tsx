import { lazy, Suspense } from 'react';
import { executeRestRequest } from '~/app/rest/actions';
import Loading from '~/components/loader/loading';
import type { Locale } from '~/i18n-config';
import { base64Decode } from '~/utils/base64';
import { isMethod } from '~/utils/rest';
import { getDictionary } from '../../dictionaries';

const RestClient = lazy(() => import('~/widgets/restClient/client'));

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale; slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale);
  const [method = 'GET', encodedUrl = '', encodedBody = ''] = slug || [];
  const url = encodedUrl ? base64Decode(encodedUrl) : '';
  const body = encodedBody ? base64Decode(encodedBody) : '';
  const reqMethod = isMethod(method) ? method : 'GET';
  const search = await searchParams;
  const response = url
    ? await executeRestRequest({
        method,
        url,
        headers: Object.fromEntries(Object.entries(search).map(([k, v]) => [k, v?.toString() ?? ''])),
        body,
      })
    : { data: '', status: 0, message: '', lapse: 0 };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RestClient
          dict={dict.Client}
          locale={locale}
          initMethod={reqMethod}
          initUrl={url}
          initBody={body}
          initQuery={search}
          response={response}
        />
      </Suspense>
    </>
  );
}
