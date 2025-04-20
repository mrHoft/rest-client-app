import styles from './error.module.css';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className={styles.error}>
      <h2>Something went wrong!</h2>
      <div className={styles.error__name}>
        {error.name}: {error.message}
      </div>
      <textarea className={styles.error__stack} readOnly value={error.stack}></textarea>
      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
