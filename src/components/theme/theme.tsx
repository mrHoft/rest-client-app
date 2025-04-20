'use client'

import React from 'react';
import { useTheme, type TThemeName } from '~/entities/useTheme';

import styles from './theme.module.css';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const newTheme = (checked ? 'dark' : 'light') as TThemeName;
    setTheme(newTheme);
  };

  return (
    <div className={styles.theme} onClick={(e) => e.stopPropagation()}>
      <input className={styles.theme__switcher} type="checkbox" checked={theme === 'dark'} onChange={handleChange} />
    </div>
  );
}
