const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');
const trimLeadingSlash = (value: string) => value.replace(/^\/+/, '');

export const getApiBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  return configuredBaseUrl ? trimTrailingSlash(configuredBaseUrl) : '/api';
};

export const buildApiUrl = (path: string) => {
  const normalizedPath = trimLeadingSlash(path);
  const baseUrl = getApiBaseUrl();

  if (/^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${baseUrl}/${normalizedPath}`;
};

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | object | null;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { headers, body, ...rest } = options;
  const requestHeaders = new Headers(headers);
  let requestBody: BodyInit | null | undefined;

  if (body == null) {
    requestBody = body;
  } else if (body instanceof FormData || body instanceof Blob || typeof body === 'string') {
    requestBody = body;
  } else {
    requestHeaders.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildApiUrl(path), {
    ...rest,
    headers: requestHeaders,
    body: requestBody,
  });

  const contentType = response.headers.get('Content-Type') ?? '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'error' in payload &&
      typeof payload.error === 'string'
        ? payload.error
        : 'Request failed';

    throw new Error(message);
  }

  return payload as T;
}

export async function sendMessage(message: string) {
  return apiRequest<{ content: string }>('chat', {
    method: 'POST',
    body: { message },
  });
}
