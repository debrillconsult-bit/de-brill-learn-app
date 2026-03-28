import { createContentRecord, deleteContentRecord, getContentItems, json, updateContentRecord } from './_data';
import { config } from './shared';

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'GET') {
    return json(getContentItems());
  }

  if (req.method === 'POST') {
    const payload = await req.json();
    if (!payload.title || !payload.description) {
      return json({ error: 'title and description are required' }, 400);
    }

    return json(
      createContentRecord({
        title: payload.title,
        description: payload.description,
        level: payload.level ?? 'Primary 1',
        status: payload.status ?? 'draft',
        audioUrl: payload.audioDataUrl || payload.audioUrl,
        audioFileName: payload.audioFileName,
      }),
      201
    );
  }

  if (req.method === 'PUT') {
    const payload = await req.json();
    const updated = updateContentRecord(payload.id, {
      title: payload.title,
      description: payload.description,
      level: payload.level,
      status: payload.status,
      audioUrl: payload.audioDataUrl || payload.audioUrl,
      audioFileName: payload.audioFileName,
    });

    if (!updated) {
      return json({ error: 'Content not found' }, 404);
    }

    return json(updated);
  }

  if (req.method === 'DELETE') {
    const { id } = await req.json();
    const deleted = deleteContentRecord(id);

    if (!deleted) {
      return json({ error: 'Content not found' }, 404);
    }

    return json({ success: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}

export { config };
