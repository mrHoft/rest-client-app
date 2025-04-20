'use client';

import { useMemo } from 'react';

import styles from './editor.module.css';

export interface HeadersItem {
  key: string;
  value: string;
  enabled: boolean;
}

interface HeadersEditorProps {
  dict: Record<string, string>;
  headers: HeadersItem[];
  setHeaders: React.Dispatch<React.SetStateAction<HeadersItem[]>>;
}

export default function HeadersEditor({ dict, headers, setHeaders }: HeadersEditorProps) {
  const handleAdd = () => setHeaders(prev => [...prev, { key: '', value: '', enabled: true }]);

  const headersTable = useMemo(() => {
    const handleInputChange = (id: number, field: 'key' | 'value', value: string) => {
      setHeaders(prev => {
        const headers = [...prev];
        headers[id][field] = value;
        return headers;
      });
    };

    const handleToggleEnabled = (id: number) => {
      setHeaders(prev =>
        prev.map((header, index) => (index === id ? { ...header, enabled: !header.enabled } : header))
      );
    };

    const handleDelete = (id: number) => {
      setHeaders(prev => prev.filter((_, i) => i !== id));
    };

    return (
      <>
        {headers.map((item, index) => (
          <div
            key={index}
            className={item.enabled ? `${styles.header_editor__row}` : `${styles.header_editor__row_disabled}`}
          >
            <div className={styles.header_editor__item}>
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={() => handleToggleEnabled(index)}
                className={styles.header_editor__toggle}
              />
            </div>
            <div className={styles.header_editor__item}>
              <input type="text" value={item.key} onChange={e => handleInputChange(index, 'key', e.target.value)} />
            </div>
            <div className={styles.header_editor__item}>
              <input type="text" value={item.value} onChange={e => handleInputChange(index, 'value', e.target.value)} />
            </div>
            <button className={styles.header_editor__del} onClick={() => handleDelete(index)}>
              <img src="/icons/cross.svg" alt="delete" />
            </button>
          </div>
        ))}
      </>
    );
  }, [headers, setHeaders]);

  return (
    <div>
      <h3 className={styles.header_editor__title}>{dict.headers}</h3>
      <div className={styles.header_editor}>
        {headersTable}
        <div className={styles.header_editor__row}>
          <div className={styles.header_editor__item} />
          <div className={styles.header_editor__item} />
          <div className={styles.header_editor__add} onClick={handleAdd}>
            {dict.add}
          </div>
        </div>
      </div>
    </div>
  );
}
