import styles from './palette.module.css';

export function Palette() {
  return (
    <ul className={styles.list}>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} style={{ backgroundColor: `var(--color${i}0)` }}>
          {i}
        </li>
      ))}
    </ul>
  );
}
