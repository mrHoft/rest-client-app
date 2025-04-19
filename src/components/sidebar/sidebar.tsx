'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ButtonSquare } from '~/components/button/square';
import { Loader } from '~/components/loader/loader';
import { Modal } from '~/components/modal/modal';
import { base64Decode } from '~/utils/base64';
import { methods, type TMethod } from '~/utils/rest';
import type { UserData } from '~/utils/supabase/types';
import { CodeGenerator } from '~/widgets/codeGenerator/generator';

import styles from './sidebar.module.css';

interface SidebarProps {
  dict: Record<string, string>;
  locale: string;
  user: UserData | null;
}

export function Sidebar({ dict, locale, user }: SidebarProps) {
  const router = useRouter();
  const query = useSearchParams();
  const params = usePathname().split('/');

  const handleNavigate = (url: string) => () => {
    if (url !== 'about') Loader.show();
    router.push(`/${locale}/${url}`, { scroll: false });
  };

  const handleCodeGenerator = () => {
    const headers = Array.from(query.entries()).map(([key, value]) => ({
      key,
      value: value?.toString() ?? '',
      enabled: true,
    }));
    const method = params[3] ?? '';
    const url = base64Decode(params[4] ?? '');
    const body = base64Decode(params[5] ? params[5].split('?')[0] : '');
    if (methods.includes(method as TMethod)) {
      Modal.show(<CodeGenerator dict={dict} data={{ method, url, body, headers }} />);
    }
  };

  return (
    <aside className={styles.sidebar}>
      {user && params[2] !== 'client' && (
        <ButtonSquare icon="server" title="REST client" onClick={handleNavigate('client/GET')} />
      )}
      {user && params[2] === 'client' && (
        <ButtonSquare icon="code" title="Generate code" onClick={handleCodeGenerator} />
      )}
      {user && params[2] !== 'history' && (
        <ButtonSquare icon="list" title="History" onClick={handleNavigate('history')} />
      )}
      {user && params[2] !== 'variables' && (
        <ButtonSquare icon="hash" title="Variables" onClick={handleNavigate('variables')} />
      )}
      <ButtonSquare icon="about" title="About" onClick={handleNavigate('about')} />
    </aside>
  );
}
