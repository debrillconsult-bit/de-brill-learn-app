import { getOverview, json } from './_data';
import { config } from './shared';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  return json(getOverview());
}

export { config };
