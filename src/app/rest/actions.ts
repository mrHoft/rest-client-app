'use server';

export interface RestRequestProps {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface RestResponse {
  data?: string;
  error?: string;
  message: string;
  status: number;
  contentType?: string;
  lapse: number;
}

function getStatus(status: number) {
  if (status === 500) {
    return 'Internal error';
  }
  if (status >= 200 && status < 300) {
    return 'ok';
  }
  if (status >= 300 && status < 400) {
    return 'in action';
  }
  if (status >= 400) {
    return 'error';
  }
  return 'Unknown';
}

export async function executeRestRequest({ method, url, headers, body }: RestRequestProps): Promise<RestResponse> {
  const info: { status: number; message: string; contentType: string; start: number } = {
    status: 500,
    message: 'Internal error',
    contentType: 'text/plain',
    start: Date.now(),
  };

  const uri = !url.startsWith('http') ? `https://${url}` : url;

  return fetch(uri, {
    method,
    headers: new Headers(headers || { 'Content-Type': 'application/json' }),
    body: method !== 'GET' && method !== 'DELETE' ? body : undefined,
  })
    .then(response => {
      info.status = response.status;
      info.message = response.statusText || getStatus(response.status);
      info.contentType = response.headers.get('content-type') ?? 'text/plain';

      if (info.contentType && info.contentType.includes('application/json')) {
        return response.json();
      }

      return response.text();
    })
    .then(data => {
      const lapse = Date.now() - info.start;

      if (info.contentType && info.contentType.includes('application/json')) {
        return {
          data: JSON.stringify(data),
          message: info.message,
          status: info.status,
          contentType: info.contentType,
          lapse,
        };
      }

      return { data, message: info.message, status: info.status, contentType: info.contentType, lapse };
    })
    .catch(error => {
      const lapse = Date.now() - info.start;
      const message = error instanceof Error ? error.message : info.message;

      return { error: message, message: info.message, status: info.status, lapse };
    });
}
