import Link from 'next/link';

import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link scroll={false} href="https://github.com/daytec-org/rest-client-app">
        <div className={`${styles.footer__logo} ${styles.github}`} />
      </Link>
      <div>2025</div>
      <Link scroll={false} href="https://rs.school/courses/reactjs">
        <div className={`${styles.footer__logo} ${styles.rss}`} />
      </Link>
    </footer>
  );
}
