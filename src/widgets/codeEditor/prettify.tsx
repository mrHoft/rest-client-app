'use client';

import styles from './button.module.css';

interface ButtonIconProps {
  name: string;
  defaultChecked?: boolean;
  onClick: (e: React.FormEvent<HTMLLabelElement>) => void;
}

export function ButtonPrettify({ name, defaultChecked, onClick }: ButtonIconProps) {
  return (
    <label
      htmlFor={`prettify_${name}`}
      title="prettify"
      className={`${styles.button} ${styles.prettify}`}
      onChange={onClick}
    >
      <input type="checkbox" id={`prettify_${name}`} defaultChecked={defaultChecked} />
      <img src={'/icons/code.svg'} alt="prettify" />
    </label>
  );
}
