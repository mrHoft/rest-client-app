'use client';

import { usePathname, useRouter } from 'next/navigation';
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
  const route = usePathname().split('/');

  const handleNavigate = (url: string) => () => {
    if (url !== 'about') Loader.show();
    router.push(`/${locale}/${url}`, { scroll: false });
  };

  const handleCodeGenerator = () => {
    if (typeof window !== 'undefined') {
      const [path, query] = window.location.href.split('?');
      const headers = query
        ? query
            .split('&')
            .map((item: string) => item.split('='))
            .map(([key, value]) => ({
              key,
              value: value?.toString() ?? '',
              enabled: true,
            }))
        : [];
      const params = path.split('/');
      const body = base64Decode(params[params.length - 1]);
      const url = base64Decode(params[params.length - 2]);
      const method = params[params.length - 3];
      if (methods.includes(method as TMethod)) {
        Modal.show(<CodeGenerator dict={dict} data={{ method, url, body, headers }} />);
      }
    }
  };

  return (
    <aside className={styles.sidebar}>
      {user && route[2] !== 'client' && (
        <ButtonSquare icon="server" title="REST client" onClick={handleNavigate('client/GET')} />
      )}
      {user && route[2] === 'client' && (
        <ButtonSquare icon="code" title="Generate code" onClick={handleCodeGenerator} />
      )}
      {user && route[2] !== 'history' && (
        <ButtonSquare icon="list" title="History" onClick={handleNavigate('history')} />
      )}
      {user && route[2] !== 'variables' && (
        <ButtonSquare icon="hash" title="Variables" onClick={handleNavigate('variables')} />
      )}
      <ButtonSquare icon="about" title="About" onClick={handleNavigate('about')} />
    </aside>
  );
}
