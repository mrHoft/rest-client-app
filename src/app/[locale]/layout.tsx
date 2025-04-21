import { Backdrop } from '~/components/backdrop/backdrop';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { Loader } from '~/components/loader/loader';
import { Message } from '~/components/message/message';
import { Modal } from '~/components/modal/modal';
import { Sidebar } from '~/components/sidebar/sidebar';
import type { Locale } from '~/i18n-config';
import { getUser } from '../auth/actions';
import { getDictionary } from './dictionaries';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const user = await getUser();
  const dict = await getDictionary(locale);

  return (
    <>
      <Header dict={dict.Header} locale={locale} user={user} />
      <main className="main">
        <Sidebar dict={dict.Client} locale={locale} user={user} />
        {children}
      </main>
      <Backdrop />
      <Footer />
      <Loader />
      <Message />
      <Modal />
    </>
  );
}
