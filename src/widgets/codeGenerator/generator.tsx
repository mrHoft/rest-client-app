'use client';

import React from 'react';
import { Select } from '~/components/select/select';
import { generateCode, type TRuntime } from '~/utils/generator';
import { CodeEditor } from '~/widgets/codeEditor/editor';
import type { HeadersItem } from '~/widgets/headersEditor/editor';

import styles from './generator.module.css';

const options: TRuntime[] = ['curl', 'fetch', 'xhr', 'node', 'go', 'python', 'java', 'csharp'];

interface GeneratorProps {
  dict: Record<string, string>;
  data: {
    method: string;
    url: string;
    body: string;
    headers: HeadersItem[];
  };
}

export function CodeGenerator({ dict, data: { method, url, body, headers } }: GeneratorProps) {
  const [runtime, setRuntime] = React.useState<TRuntime>('curl');
  const fullUrl = !url.startsWith('http') ? `https://${url}` : url;

  const handleChange = (value: string) => {
    setRuntime(value as TRuntime);
  };

  return (
    <section className={styles.generator} aria-label="code generator">
      <div className={styles.generator__controls}>
        <h3 className={styles.generator__title}>{dict.code}</h3>
        <div style={{ width: '8rem' }}>
          <Select options={options} name="select" defaultValue={runtime} onChange={handleChange} />
        </div>
      </div>
      <CodeEditor name="code" data={generateCode(runtime, method, fullUrl, body, headers)} readonly prettify />
    </section>
  );
}
