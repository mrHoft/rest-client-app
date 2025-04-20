'use client';

import { useState } from 'react';

import styles from './button.module.css';

interface ButtonIconProps {
  onClick: (e: React.MouseEvent) => void;
}

export function ButtonCopy({ onClick }: ButtonIconProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    onClick(event);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button type="button" title="copy" className={`${styles.button} ${styles.copy}`} onClick={handleClick}>
      <img src={'/icons/copy.svg'} alt="copy" />
      {copied && <div className={styles.copy__msg}>Copied!</div>}
    </button>
  );
}
