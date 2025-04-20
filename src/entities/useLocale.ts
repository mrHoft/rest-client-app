'use client';

import React from 'react';
import { getLifespan, setCookie } from '~/utils/cookie';

export type TLanguage = 'en' | 'ru';
const defaultLanguage = 'en';

export const useLocale = () => {
  const [lang, setLang] = React.useState(defaultLanguage);

  const setLocale = (locale: string) => {
    setLang(locale);

    setCookie({
      locale,
      expires: getLifespan(30),
      samesite: 'lax',
      path: '/',
    });
  };

  return { lang, setLocale };
};
