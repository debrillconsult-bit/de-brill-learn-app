import { assignClassRecord, getClassRecords, hydrateClass, json } from './_data';
import { config } from './shared';

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(getClassRecords().map(hydrateClass));
  }

  if (req.method === 'PUT') {
    const { classId, teacherId, studentIds } = await req.json();
    const updated = assignClassRecord(classId, teacherId, studentIds ?? []);

    if (!updated) {
      return json({ error: 'Class not found' }, 404);
    }

    return json(hydrateClass(updated));
  }

  return json({ error: 'Method not allowed' }, 405);
}

export { config };
