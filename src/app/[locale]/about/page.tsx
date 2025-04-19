import type { Locale } from '~/i18n-config';
import About from '~/widgets/about/about';
import { getDictionary } from '../dictionaries';

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <About dict={dict.About} />;
}
