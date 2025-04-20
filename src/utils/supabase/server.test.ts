import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from './server';

jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockResolvedValue({
    getAll: jest.fn().mockReturnValue([]),
    set: jest.fn(),
  }),
}));

describe('createClient', () => {
  it('should call cookies function', async () => {
    await createClient();

    expect(cookies).toHaveBeenCalled();
  });

  it('should handle getAll correctly', async () => {
    const cookieStore = await cookies();
    const getAllMock = cookieStore.getAll;
    const cookiesToGet = [{ name: 'test', value: 'value' }];
    (getAllMock as jest.Mock).mockReturnValue(cookiesToGet);
    await createClient();
    const supabaseCookies = (createServerClient as jest.Mock).mock.calls[0][2].cookies;

    expect(supabaseCookies.getAll()).toEqual(cookiesToGet);
  });

  it('should handle setAll correctly', async () => {
    const cookieStore = await cookies();
    const setMock = cookieStore.set;
    const cookiesToSet = [{ name: 'test', value: 'value', options: { option1: 'value1' } }];
    await createClient();
    const supabaseCookies = (createServerClient as jest.Mock).mock.calls[0][2].cookies;
    supabaseCookies.setAll(cookiesToSet);

    expect(setMock).toHaveBeenCalledWith('test', 'value', { option1: 'value1' });
  });

  it('should catch error when setAll cookies', async () => {
    const cookieStore = await cookies();
    const setMock = cookieStore.set;
    (setMock as jest.Mock).mockImplementation(() => {
      throw new Error('Cannot set cookie');
    });
    await createClient();
    const supabaseCookies = (createServerClient as jest.Mock).mock.calls[0][2].cookies;
    const cookiesToSet = [{ name: 'test', value: 'value', options: { option1: 'value1' } }];

    expect(() => supabaseCookies.setAll(cookiesToSet)).not.toThrow();
  });
});
