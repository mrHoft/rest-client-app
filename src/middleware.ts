import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '~/utils/supabase/middleware';
import { i18n } from './i18n-config';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value ?? i18n.defaultLocale;
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return await updateSession(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
