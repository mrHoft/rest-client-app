'use client';

import { useEffect, useRef, useState } from 'react';
import { prettifyString, sanitize } from '~/utils/pretty';
import { ButtonCopy } from './copy';
import { ButtonPrettify } from './prettify';

import styles from './editor.module.css';

interface CodeEditorProps {
  data: string;
  name: string;
  prettify?: boolean;
  readonly?: boolean;
  onInput?: (value: string) => void;
  onBlur?: (value: string) => void;
}

export function CodeEditor({ data, name, prettify = false, readonly, onInput, onBlur }: CodeEditorProps) {
  const [numbers, setNumbers] = useState<{ index: number; height?: number }[]>([]);
  const [pretty, setPretty] = useState(prettify);
  const [mode, setMode] = useState('plain');
  const [code, setCode] = useState({
    text: '',
    lines: 0,
    caret: { nodeIndex: 0, offset: 0 },
  });
  const ref = useRef<HTMLPreElement>(null);

  const updateNumbers = (text: string) => {
    const lines = text.split('\n');
    const arr = Array.from(lines).map((_, index) => {
      return { index };
    });
    setNumbers(arr);
  };

  const updateCode = () => {
    if (ref.current && pretty) {
      const { format, result } = prettifyString(code.text);
      setMode(format);
      ref.current.innerHTML = result.join('\n');
      if (!readonly) {
        const selection = window.getSelection();
        if (selection && ref.current && code.caret.nodeIndex !== -1) {
          const node = ref.current.childNodes[code.caret.nodeIndex];
          const offset = Math.min(node?.textContent?.length ?? 0, code.caret.offset);
          if (node) {
            selection.setPosition(node, offset);
          }
        }
      }
    }
  };

  const setupCode = (newCode = code) => {
    if (ref.current) {
      if (pretty) {
        const { format, result } = prettifyString(newCode.text);
        setMode(format);
        ref.current.innerHTML = result.join('\n');
      } else {
        ref.current.innerHTML = sanitize(newCode.text);
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLPreElement>) => {
    const text = e.currentTarget.innerText;
    const lines = text.split('\n');

    if (text.length !== code.text.length) {
      setCode(prev => ({ ...prev, text }));
      if (pretty) {
        const selection = window.getSelection();
        const nodeIndex = Array.from(e.currentTarget.childNodes).findIndex(node => node === selection?.anchorNode);
        setCode(prev => ({ ...prev, caret: { nodeIndex, offset: selection?.anchorOffset ?? 0 } }));
      }
    }
    if (lines.length !== code.lines) {
      setCode(prev => ({ ...prev, lines: lines.length }));
      updateNumbers(text);
      if (onInput) onInput(text);
    }
  };

  const handleBlur = (e: React.FormEvent<HTMLPreElement>) => {
    if (onBlur) onBlur(e.currentTarget.innerText);
  };

  const handleCopy = () => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText);
    }
  };

  useEffect(() => {
    updateCode();
  }, [code.text]);

  useEffect(() => {
    setupCode(code);
    if (!pretty) setMode('plain');
  }, [pretty]);

  useEffect(() => {
    if (data) {
      const newCode = {
        text: data,
        lines: data.split('\n').length,
        caret: { nodeIndex: 0, offset: 0 },
      };
      setCode(newCode);
      setupCode(newCode);
      updateNumbers(data);
    }
  }, [data]);

  return (
    <div className={styles.editor}>
      <div className={styles.editor__mode}>{mode}</div>
      <ButtonPrettify name={name} defaultChecked={prettify} onClick={() => setPretty(prev => !prev)} />
      <ButtonCopy onClick={handleCopy} />
      <div className={styles.editor__code}>
        <div className={styles.editor__numbers}>
          {numbers.map(({ height }, index) => (
            <div key={index} style={{ height }}>
              {index + 1}
            </div>
          ))}
        </div>
        <pre
          ref={ref}
          className={readonly ? styles.editor__strings : `${styles.editor__strings} ${styles.editable}`}
          contentEditable={readonly ? undefined : 'true'}
          suppressContentEditableWarning
          spellCheck="false"
          autoCorrect="off"
          translate="no"
          role="textbox"
          onInput={handleInput}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}
