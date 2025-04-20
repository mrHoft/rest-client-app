import type { Locale } from '~/i18n-config';
import Register from '~/widgets/register/register';
import { getDictionary } from '../dictionaries';

export default async function PageRegister({ params }: { params: Promise<{ locale: Locale; slug?: string[] }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <Register dict={dict.RegisterPage} locale={locale} />;
}
