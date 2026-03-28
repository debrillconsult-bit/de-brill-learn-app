import { getUsers, json } from './_data';
import { config } from './shared';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  return json(getUsers().filter(user => user.role === 'teacher'));
}

export { config };
