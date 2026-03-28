import { deleteUserRecord, getUsers, json, updateUserRecord } from './_data';
import { config } from './shared';

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase() ?? '';
    const page = Number(searchParams.get('page') ?? '1');
    const pageSize = Number(searchParams.get('pageSize') ?? '5');

    const filtered = getUsers().filter(user => {
      const matchesRole = !role || user.role === role;
      const matchesStatus = !status || user.status === status;
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      return matchesRole && matchesStatus && matchesSearch;
    });

    const startIndex = (page - 1) * pageSize;

    return json({
      items: filtered.slice(startIndex, startIndex + pageSize),
      total: filtered.length,
      page,
      pageSize,
    });
  }

  if (req.method === 'PUT') {
    const { id, ...updates } = await req.json();
    const updatedUser = updateUserRecord(id, updates);

    if (!updatedUser) {
      return json({ error: 'User not found' }, 404);
    }

    return json(updatedUser);
  }

  if (req.method === 'DELETE') {
    const { id } = await req.json();
    const deleted = deleteUserRecord(id);

    if (!deleted) {
      return json({ error: 'User not found' }, 404);
    }

    return json({ success: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}

export { config };
