import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signout } from '~/app/auth/actions';
import type { UserData } from '~/utils/supabase/types';

import styles from './logout.module.css';

interface ButtonLogoutProps {
  dict: Record<string, string>;
  locale: string;
  user: UserData | null;
}

export function ButtonLogout({ dict, locale, user }: ButtonLogoutProps) {
  const router = useRouter();
  const handleSingOut = async () => {
    await signout();
    router.push(`/${locale}`);
  };
  if (!user)
    return (
      <Link scroll={false} href={`/${locale}/login`}>
        <button className={`button ${styles.sign} ${styles.in}`}>{dict.login}</button>
      </Link>
    );

  return (
    <form action={handleSingOut}>
      <button className={`button ${styles.sign} ${styles.out}`}>{dict.logout}</button>
    </form>
  );
}
