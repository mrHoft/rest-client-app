'use client';

import { useState } from 'react';

import styles from './button.module.css';

type TIcon = 'about' | 'server' | 'code' | 'hash' | 'list' | 'copy' | 'edit';

const src: Record<TIcon, string> = {
  about: '/icons/about.svg',
  server: '/icons/server.svg',
  code: '/icons/code.svg',
  hash: '/icons/hash.svg',
  list: '/icons/list.svg',
  copy: '/icons/copy.svg',
  edit: '/icons/edit.svg',
};

interface ButtonIconProps {
  icon: TIcon;
  title?: string;
  loading?: boolean;
  active?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function ButtonSquare({ icon, title, loading, active, onClick }: ButtonIconProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    onClick(event);
    if (icon === 'copy') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      title={title}
      className={active ? `${styles.button} ${styles.button_active}` : styles.button}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? <div className={styles.button_loader} /> : <img src={src[icon]} alt={icon} />}
      {copied && <div className={styles.copy__msg}>Copied!</div>}
    </button>
  );
}
