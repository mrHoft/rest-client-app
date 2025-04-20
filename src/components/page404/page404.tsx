import Link from 'next/link';

import styles from './page404.module.css';

export default function Page404() {
  return (
    <div className={styles.page404}>
      <h2>Page Not Found</h2>
      <div className={styles.page404__image} />
      <Link scroll={false} className={styles.page404__link} href="/">
        Back to the main page
      </Link>
    </div>
  );
}
