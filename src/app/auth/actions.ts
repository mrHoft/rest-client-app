'use server';

import { createClient } from '~/utils/supabase/server';
import { UserData } from '~/utils/supabase/types';

const isProduction = process.env.NODE_ENV === 'production';

class UserHolder {
  private _user: UserData | null = null;

  get user() {
    return this._user;
  }

  set user(user: UserData | null) {
    this._user = user
      ? {
          id: user.id,
          email: user.email,
          phone: user.phone,
          role: user.role,
          created_at: user.created_at,
          updated_at: user.updated_at,
          last_sign_in_at: user.last_sign_in_at,
          is_anonymous: user.is_anonymous,
        }
      : null;
  }
}

const userHolder = new UserHolder();

export async function login(data: { email: string; password: string }) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message || 'Login failed' };
  }

  userHolder.user = user;

  return { success: true };
}

export async function register(data: { email: string; password: string }) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message || 'Registration failed' };
  }

  userHolder.user = user;

  return { success: true };
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  userHolder.user = null;
}

export async function getUser() {
  if (!isProduction && userHolder.user) return userHolder.user;

  const supabase = await createClient();
  userHolder.user = (await supabase.auth.getUser()).data.user;

  return userHolder.user;
}
