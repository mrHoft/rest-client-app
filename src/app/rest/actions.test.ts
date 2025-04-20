import { executeRestRequest } from './actions';

describe('executeRestRequest', () => {
  it('uses correct fetch options', async () => {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        headers,
        json: () => Promise.resolve({ some: 'test response' }),
      })
    ) as jest.Mock;

    const requestData = { method: 'GET', url: 'test', headers: { some: 'test header' } };
    executeRestRequest(requestData);

    const expectedHeaders = new Headers(requestData.headers);
    const expectedOptions = { method: 'GET', headers: expectedHeaders, body: undefined };

    expect(fetch).toHaveBeenCalledWith('https://test', expectedOptions);
  });

  it('handles with errors', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('test error'))) as jest.Mock;

    const requestData = { method: 'GET', url: 'test', headers: { some: 'test header' } };
    const response = await executeRestRequest(requestData);

    expect(response.error).toBe('test error');
  });
});
