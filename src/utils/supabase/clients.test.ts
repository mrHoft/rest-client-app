import { createBrowserClient } from '@supabase/ssr';
import { createClient } from './clients';

jest.mock('@supabase/ssr', () => ({
  createBrowserClient: jest.fn(),
}));

const mockCreateBrowserClient = createBrowserClient as jest.Mock;

describe('createClient', () => {
  const originalEnv = process.env;
  const mockUrl = 'http://mock.supabase.co';
  const mockAnonKey = 'mock-anon-key';

  jest.clearAllMocks();
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_SUPABASE_URL: mockUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: mockAnonKey,
  };

  it('should call createBrowserClient with correct environment variables', () => {
    createClient();

    expect(mockCreateBrowserClient).toHaveBeenCalledWith(mockUrl, mockAnonKey);
  });
});
