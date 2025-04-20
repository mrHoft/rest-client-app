import { generateCode } from './generator';

describe('generateCode', () => {
  const body = '{"useId": 55}';
  const headers = [{ key: 'connection', value: 'keep-alive', enabled: true }];
  const url = 'https://exampleurl.com';
  const postMethod = 'POST';
  const getMethod = 'GET';

  it('should generate fetch code', () => {
    const result = generateCode('fetch', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('fetch', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate xhr code', () => {
    const result = generateCode('xhr', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('xhr', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate curl code', () => {
    const result = generateCode('curl', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('curl', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate node code', () => {
    const result = generateCode('node', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url.slice(8));

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('node', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate python code', () => {
    const result = generateCode('python', postMethod, url, body, headers);

    expect(result).toContain(postMethod.toLowerCase());

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('python', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate java code', () => {
    const result = generateCode('java', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('java', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate csharp code', () => {
    const result = generateCode('csharp', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('csharp', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should generate go code', () => {
    const result = generateCode('go', postMethod, url, body, headers);

    expect(result).toContain(postMethod);

    expect(result).toContain(url);

    expect(result).toContain(body);

    expect(result).toContain(headers[0].key);

    expect(result).toContain(headers[0].value);

    const resultGetMethod = generateCode('go', getMethod, url, body, headers);

    expect(resultGetMethod).not.toContain(body);
  });

  it('should return an error message for unsupported runtime', () => {
    const result = generateCode('C', postMethod, url, body, headers);

    expect(result).toBe('C not supported');
  });
});
