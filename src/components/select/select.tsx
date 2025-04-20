'use client';

import React from 'react';

import styles from './select.module.css';

export type TSelectProps = {
  options: string[];
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  required?: boolean;
  title?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
};

const Select = React.forwardRef<HTMLSelectElement, TSelectProps>(
  ({ options, name, placeholder, defaultValue, value, required, title, onChange, onBlur }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(e.target.value);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (onBlur) onBlur(e.target.value);
    };

    return (
      <div className={styles.select} onClick={e => e.stopPropagation()}>
        <select
          ref={ref}
          className={styles.select__element}
          name={name}
          defaultValue={defaultValue}
          value={value}
          required={required ?? false}
          title={title}
          onChange={handleChange}
          onBlur={handleBlur}
          data-placeholder={placeholder ? 'true' : 'false'}
        >
          {options.map((role, i) => (
            <option key={i}>{role}</option>
          ))}
        </select>
        {placeholder && <div className={styles.select__placeholder}>{placeholder}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
