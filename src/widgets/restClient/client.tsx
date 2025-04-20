'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { RestResponse } from '~/app/rest/actions';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { useDebounce } from '~/entities/useDebounce';
import useHistory from '~/entities/useHistory';
import useVariables from '~/entities/useVariables';
import type { Locale } from '~/i18n-config';
import { getRequestUrlString, methods, type TMethod } from '~/utils/rest';
import { CodeEditor } from '~/widgets/codeEditor/editor';
import { CodeGenerator } from '~/widgets/codeGenerator/generator';
import HeadersEditor, { HeadersItem } from '~/widgets/headersEditor/editor';
import { ResponseViewer } from '~/widgets/response/response';

import styles from './client.module.css';

type TQuery = { [key: string]: string | string[] | undefined };
interface RestClientProps {
  dict: Record<string, string>;
  locale: Locale;
  initMethod: TMethod;
  initUrl: string;
  initBody: string;
  initQuery: TQuery;
  response: RestResponse;
}
interface RestClientState {
  method: TMethod;
  url: string;
  body: string;
}

const defaultHeader = { key: 'Content-type', value: 'application/json', enabled: true };

const getInitialHeaders = (query: TQuery) => {
  const headers = Object.entries(query).map(([key, value]) => ({ key, value: value?.toString() ?? '', enabled: true }));

  const knownHeaders: string[] = [];
  headers.filter(h => {
    const known = knownHeaders.includes(h.key);
    knownHeaders.push(h.key);
    return !known;
  });

  if (headers.findIndex(h => h.key === defaultHeader.key) === -1) {
    headers.unshift(defaultHeader);
  }

  return headers;
};

export default function RestClient({
  dict,
  locale,
  initUrl,
  initBody,
  initQuery,
  initMethod,
  response,
}: RestClientProps) {
  const { pushHistory } = useHistory();
  const { getVariables } = useVariables();
  const router = useRouter();
  const [headers, setHeaders] = useState<HeadersItem[]>(() => getInitialHeaders(initQuery));
  const [requestPath, setRequestPath] = useState('');
  const variables = useMemo(() => getVariables() ?? {}, [getVariables]);
  const [state, setState] = useState<RestClientState>({
    method: initMethod,
    url: initUrl,
    body: initBody,
  });
  const [stateWithVariables, setStateWithVariables] = useState<RestClientState & { headers: HeadersItem[] }>({
    ...state,
    headers,
  });

  const replaceVariables = useCallback(
    (value: string): string => {
      return value.replace(/\{\{([^\}]+)\}\}/g, (match, variable) => {
        return variables[variable] ?? match;
      });
    },
    [variables]
  );

  const activeHeaders = useMemo(
    () =>
      headers
        .filter(h => h.enabled && h.key && h.value)
        .map(({ key, value, enabled }) => ({ key, value: replaceVariables(value), enabled })),
    [headers, replaceVariables]
  );

  const debouncedUrl = useDebounce(state.url);
  const debouncedHeaders = useDebounce(activeHeaders);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Loader.show();
    pushHistory({ method: state.method, url: requestPath, date: Date.now() });
    router.push(requestPath);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({ ...prev, method: e.target.value as TMethod }));
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, url: e.target.value }));
  };

  const handleBodyChange = (body: string) => {
    setState(prev => ({ ...prev, body }));
  };

  useEffect(() => {
    const data = {
      locale,
      method: state.method,
      url: replaceVariables(debouncedUrl),
      body: replaceVariables(state.body),
      headers: debouncedHeaders,
    };
    setRequestPath(getRequestUrlString(data));
    setStateWithVariables(data);
  }, [locale, state, debouncedUrl, debouncedHeaders, replaceVariables]);

  useEffect(() => {
    history.replaceState(null, '', requestPath);
  }, [requestPath]);

  useEffect(() => {
    Loader.hide();
    if (response.error) {
      Message.show(response.error, 'error');
    }
  }, [response]);

  useEffect(Loader.hide, []);

  return (
    <div className={styles.client}>
      <h1 className={styles.client__title}>{dict.title}</h1>
      <form onSubmit={handleSubmit} className={styles.client__form}>
        <div className={styles.client__req}>
          <select name="method" value={state.method} onChange={handleMethodChange} className={styles.client__method}>
            {methods.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="url"
            value={state.url}
            onChange={handleURLChange}
            placeholder={dict.urlPlaceholder}
            className={styles.client__url}
          />
        </div>
        <button type="submit" className="button">
          {dict.send}
        </button>
      </form>
      <HeadersEditor dict={dict} headers={headers} setHeaders={setHeaders} />
      <section aria-label="body">
        <h3 className={styles.client__section_title}>{dict.body}</h3>
        <CodeEditor name="body" data={state.body} onBlur={handleBodyChange} />
      </section>
      {response.data && <ResponseViewer dict={dict} response={response} />}
      <CodeGenerator dict={dict} data={stateWithVariables} />
    </div>
  );
}
