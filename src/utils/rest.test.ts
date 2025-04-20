import { getRequestUrlString, isMethod } from './rest';

describe('rest', () => {
  describe('getRequestUrlString', () => {
    it('should return a valid URL string', () => {
      const locale = 'en';
      const method = 'POST';
      const url = 'https://example.com';
      const body = '{"id": 30, "name": "John"}';
      const headers = [{ key: 'Content-Type', value: 'application/json' }];

      expect(getRequestUrlString({ locale, method, url, body, headers })).toBe(
        '/en/client/POST/aHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbQ==/JTdCJTIyaWQlMjIlM0ElMjAzMCUyQyUyMCUyMm5hbWUlMjIlM0ElMjAlMjJKb2huJTIyJTdE?Content-Type=application/json'
      );
    });

    it('should return a valid URL string with only required parameters', () => {
      const locale = 'en';
      const method = 'GET';

      expect(getRequestUrlString({ locale, method })).toBe('/en/client/GET//?');
    });

    it('should trim url before encoding', () => {
      const locale = 'en';
      const method = 'POST';
      const url = '     https://example.com        ';
      const headers = [{ key: 'Content-Type', value: 'application/json' }];

      expect(getRequestUrlString({ locale, method, url, headers })).toBe(
        '/en/client/POST/aHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbQ==/?Content-Type=application/json'
      );
    });
  });

  describe('isMethod', () => {
    it('should return true for valid methods', () => {
      expect(isMethod('GET')).toBe(true);

      expect(isMethod('POST')).toBe(true);

      expect(isMethod('PUT')).toBe(true);

      expect(isMethod('PATCH')).toBe(true);

      expect(isMethod('DELETE')).toBe(true);
    });

    it('should return false for invalid methods', () => {
      expect(isMethod('METHOD')).toBe(false);

      expect(isMethod('')).toBe(false);

      expect(isMethod('get')).toBe(false);
    });
  });
});
