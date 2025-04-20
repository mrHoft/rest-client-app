import { base64Decode, base64Encode } from './base64';

describe('base64', () => {
  it('encodes a string and decodes it', () => {
    const value = 'Test string';
    const encoded = base64Encode(value);
    const decoded = base64Decode(encoded);

    expect(value).toEqual(decoded);
  });

  it('encodes and decodes a string with russian letters', () => {
    const value = 'Строка с русскими символами';
    const encoded = base64Encode(value);
    const decoded = base64Decode(encoded);

    expect(decoded).toEqual(value);
  });
});
