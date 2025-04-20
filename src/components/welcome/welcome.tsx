import Link from 'next/link';
import { getUser } from '~/app/auth/actions';

import form from '~/styles/form.module.css';

export async function Welcome({ dict, locale }: { dict: Record<string, string>; locale: string }) {
  const user = await getUser();

  return (
    <div className={form.container}>
      {user ? (
        <>
          <h2 className={form.title}>
            {dict.greetingWithUser} {user.email}!
          </h2>
          <div className="align_center">
            <Link scroll={false} href={`${locale}/client/GET`} className="button">
              {dict.restClient}
            </Link>
            <Link scroll={false} href={`${locale}/history`} className="button">
              {dict.history}
            </Link>
            <Link scroll={false} href={`${locale}/variables`} className="button">
              {dict.variables}
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className={form.title}>{dict.greetingWithoutUser}</h2>
          <div className="align_center">
            <Link scroll={false} href={`${locale}/login`} className="button">
              {dict.login}
            </Link>
            <Link scroll={false} href={`${locale}/register`} className="button">
              {dict.signUp}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
