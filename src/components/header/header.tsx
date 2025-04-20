'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LanguageSelector from '~/components/language/language';
import { ButtonLogout } from '~/components/logout/logout';
import ThemeSwitcher from '~/components/theme/theme';
import type { UserData } from '~/utils/supabase/types';

import styles from './header.module.css';

export function Header({
  dict,
  locale,
  user,
}: {
  dict: Record<string, string>;
  locale: string;
  user: UserData | null;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.header_scrolled : ''}`}>
      <Link scroll={false} href={`/${locale}`} className={styles.header__title}>
        <div className={styles.header__logo} />
        <h3 className={styles.header__title_text}>Restman</h3>
      </Link>
      <div className={styles.header__right}>
        {user ? (
          <Link scroll={false} href={`/${locale}`} className={`button ${styles.header__link}`}>
            {dict.mainPage}
          </Link>
        ) : (
          <Link scroll={false} href={`/${locale}/register`} className={`button ${styles.header__link}`}>
            {dict.signUp}
          </Link>
        )}
        <ButtonLogout dict={dict} locale={locale} user={user} />
        <LanguageSelector />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
