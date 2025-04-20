import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { prettify, prettifyString, PrettyHtml, PrettyJson, PrettyJsonString, sanitize } from './pretty';

describe('Prettify Utilities', () => {
  describe('sanitize', () => {
    it('should replace < and > with &lt; and &gt;', () => {
      expect(sanitize('<div>Test</div>')).toBe('&lt;div&gt;Test&lt;/div&gt;');
    });
  });

  describe('PrettyJson', () => {
    it('should render formatted JSON', () => {
      const jsonData = JSON.stringify({ name: 'test', value: 5 });
      const { getByText } = render(<PrettyJson data={jsonData} />);

      expect(getByText(/"name":/)).toBeInTheDocument();

      expect(getByText(/"test"/)).toBeInTheDocument();
    });

    it('should handle invalid JSON', () => {
      const invalidJson = 'invalid: json';
      const { getByText } = render(<PrettyJson data={invalidJson} />);

      expect(getByText('invalid: json')).toBeInTheDocument();
    });
  });

  describe('PrettyHtml', () => {
    it('should render formatted HTML', () => {
      const htmlData = '<div>test</div>';
      const { container, getByText } = render(<PrettyHtml data={htmlData} />);

      expect(container.querySelectorAll('span').length).toBe(3);

      expect(getByText('test')).toBeInTheDocument();
    });
  });

  describe('prettify', () => {
    it('should format JSON', () => {
      const result = prettify('{"key": "value"}');

      expect(result.format).toBe('JSON');
    });

    it('should format XML/HTML', () => {
      const result = prettify('<div>test</div>');

      expect(result.format).toBe('XML');
    });

    it('should plain text', () => {
      const result = prettify('plain text');

      expect(result.format).toBe('plain');
    });
  });

  describe('PrettyJsonString', () => {
    it('should return JSON format if JSON is valid', () => {
      const value = JSON.stringify({ name: 'test', value: 5 });
      const result = PrettyJsonString(value);

      expect(result.format).toBe('JSON');

      expect(result.result.length).toBe(4);
    });

    it('should return plain format if JSON is invalid', () => {
      const value = '{ invalid: json }';
      const result = PrettyJsonString(value);

      expect(result.format).toBe('plain');

      expect(result.result[0]).toContain('{ invalid: json }');
    });
  });

  describe('prettifyString', () => {
    it('should format JSON strings', () => {
      const result = prettifyString('{"id": 5, "title": "test"}');

      expect(result.format).toBe('JSON');

      expect(result.result.length).toBe(4);
    });

    it('should format HTML strings', () => {
      const result = prettifyString('<div>test</div>');

      expect(result.format).toBe('XML');

      expect(result.result.some(line => line.includes('&lt;div&gt;'))).toBe(true);
    });

    it('should handle plain text strings', () => {
      const result = prettifyString('plain text');

      expect(result.format).toBe('plain');

      expect(result.result.length).toBe(1);
    });
  });
});
