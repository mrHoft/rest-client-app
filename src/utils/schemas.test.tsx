import { loginSchema, registerSchema } from './schemas';

describe('Schemas', () => {
  describe('registerSchema', () => {
    it('should validate inputs correctly', () => {
      const registerData = {
        email: 'test@example.com',
        password: 'Password1@',
        confirmPassword: 'Password1@',
      };
      const result = registerSchema.safeParse(registerData);

      expect(result.success).toBe(true);
    });
  });

  describe('loginSchema', () => {
    it('should validate login inputs correctly', () => {
      const loginData = {
        email: 'test@example.com',
        password: 'Password1@',
      };
      const result = loginSchema.safeParse(loginData);

      expect(result.success).toBe(true);
    });

    it('should fail if email is invalid', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password1@',
      };
      const result = loginSchema.safeParse(invalidData);

      expect(result.success).toBe(false);

      expect(result.error?.issues[0].message).toBe('Invalid email address');
    });
  });
});
