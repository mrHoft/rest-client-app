import { Welcome } from '~/components/welcome/welcome';
import type { Locale } from '~/i18n-config';
import About from '~/widgets/about/about';
import { getDictionary } from './dictionaries';

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Welcome dict={dict.MainPage} locale={locale} />
      <About dict={dict.About} />
    </>
  );
}
