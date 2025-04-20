/**
 * @jest-environment node
 */

import { createServerClient } from '@supabase/ssr';
import { NextRequest } from 'next/server';
import { updateSession } from './middleware';

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(),
}));

const mockAuth = { getUser: jest.fn() };
const mockSupabase = { auth: mockAuth };
(createServerClient as jest.Mock).mockReturnValue(mockSupabase);
const mockGetUser = mockAuth.getUser;

const createMockRequest = (pathname: string, cookies = {}) => {
  const origin = 'http://example.com';
  const urlString = `${origin}${pathname}`;
  const url = new URL(urlString);
  const request = new Request(urlString);
  const cookieStore = {
    getAll: () => Object.entries(cookies).map(([name, value]) => ({ name, value })),
    set: jest.fn(),
  };
  const nextUrlMock: Partial<NextRequest['nextUrl']> = {
    pathname: url.pathname,
    searchParams: url.searchParams,
    origin: url.origin,
    toString: () => url.toString(),
    clone: () => {
      const clonedUrl = new URL(url.origin);
      return clonedUrl;
    },
  };
  const mockRequest = {
    ...request,
    cookies: cookieStore,
    nextUrl: nextUrlMock as NextRequest['nextUrl'],
  } as unknown as NextRequest;

  return mockRequest;
};

describe('middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect unauthorized user from protected route', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    const request = createMockRequest('/client');
    const response = await updateSession(request);

    expect(response.headers.get('location')).toBe('http://example.com/');
  });

  it('should redirect authorized user from auth route', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { email: 'user@mail.com' } } });
    const request = createMockRequest('/login');
    const response = await updateSession(request);

    expect(response.headers.get('location')).toBe('http://example.com/');
  });

  it('should allow access to protected routes for authorized user ', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { email: 'user@mail.com' } } });
    const request = createMockRequest('/client');
    const response = await updateSession(request);

    expect(response.status).toBe(200);
  });

  it('should allow access to auth routes for unauthorized user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    const request = createMockRequest('/register');
    const response = await updateSession(request);

    expect(response.status).toBe(200);
  });

  it('should call cookies setAll', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { email: 'user@mail.com' } } });
    const request = createMockRequest('/client', { cookie: 'test' });
    await updateSession(request);
    const mockSetAll = (createServerClient as jest.Mock).mock.calls[0][2].cookies.setAll;
    const cookiesToSet = [{ name: 'example-name', value: 'example-value' }];
    mockSetAll(cookiesToSet);

    expect(request.cookies.set).toHaveBeenCalled();
  });
});
