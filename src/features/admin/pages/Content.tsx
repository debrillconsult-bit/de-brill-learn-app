import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import {
  createContent,
  deleteContent,
  getContent,
  updateContent,
} from '@/src/features/admin/services/adminApi';
import type { ContentPayload } from '@/src/features/admin/services/adminApi';
import type { AdminContentItem } from '@/src/features/admin/types';

interface ContentFormState extends ContentPayload {
  audioFileName: string;
  audioDataUrl: string;
}

const emptyForm: ContentFormState = {
  title: '',
  description: '',
  level: 'Primary 1',
  status: 'draft',
  audioUrl: '',
  audioFileName: '',
  audioDataUrl: '',
};

export const AdminContentPage = () => {
  const [items, setItems] = React.useState<AdminContentItem[]>([]);
  const [form, setForm] = React.useState<ContentFormState>(emptyForm);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadContent = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setItems(await getContent());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError(null);

      if (editingId) {
        await updateContent(editingId, form);
      } else {
        await createContent(form);
      }

      resetForm();
      await loadContent();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: AdminContentItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      level: item.level,
      status: item.status,
      audioUrl: item.audioUrl ?? '',
      audioFileName: item.audioFileName ?? '',
      audioDataUrl: item.audioUrl?.startsWith('data:') ? item.audioUrl : '',
    });
  };

  const remove = async (itemId: string) => {
    try {
      setError(null);
      await deleteContent(itemId);
      await loadContent();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Failed to delete lesson');
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard
        eyebrow="Content"
        title="Lesson library"
        description="Create, edit, and remove lessons. Audio can be supplied by URL or uploaded directly for demo storage."
      >
        {error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-2xl bg-[#F7FAFD] px-4 py-6 text-brand-muted">Loading content...</div>
          ) : (
            items.map(item => (
              <article key={item.id} className="rounded-[22px] border border-[#E3EAF2] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[16px] font-bold text-brand-navy">{item.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] text-brand-muted">{item.description}</p>
                    <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-gold">{item.level}</p>
                    {item.audioUrl ? (
                      <audio controls className="mt-3 h-10 w-full max-w-md">
                        <source src={item.audioUrl} />
                      </audio>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(item)} className="rounded-xl border border-[#D8E1EC] px-3 py-2 text-[12px] font-bold">
                      Edit
                    </button>
                    <button onClick={() => void remove(item.id)} className="flex items-center gap-1 rounded-xl border border-red-200 px-3 py-2 text-[12px] font-bold text-red-700">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Editor"
        title={editingId ? 'Edit lesson' : 'Create lesson'}
        description="Keep lesson metadata and audio together."
      >
        <form onSubmit={submit} className="space-y-4">
          <input
            required
            value={form.title}
            onChange={event => setForm(current => ({ ...current, title: event.target.value }))}
            className="w-full rounded-2xl border border-[#D8E1EC] px-4 py-3"
            placeholder="Lesson title"
          />
          <textarea
            required
            value={form.description}
            onChange={event => setForm(current => ({ ...current, description: event.target.value }))}
            className="min-h-[140px] w-full rounded-2xl border border-[#D8E1EC] px-4 py-3"
            placeholder="Lesson description"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <select
              value={form.level}
              onChange={event => setForm(current => ({ ...current, level: event.target.value }))}
              className="rounded-2xl border border-[#D8E1EC] px-4 py-3"
            >
              <option>Primary 1</option>
              <option>Primary 2</option>
              <option>Primary 3</option>
              <option>Primary 4</option>
              <option>Primary 5</option>
            </select>
            <select
              value={form.status}
              onChange={event => setForm(current => ({ ...current, status: event.target.value as 'draft' | 'published' }))}
              className="rounded-2xl border border-[#D8E1EC] px-4 py-3"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <input
            value={form.audioUrl}
            onChange={event => setForm(current => ({ ...current, audioUrl: event.target.value, audioDataUrl: '' }))}
            className="w-full rounded-2xl border border-[#D8E1EC] px-4 py-3"
            placeholder="Audio URL (optional)"
          />
          <label className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-dashed border-[#D8E1EC] px-4 py-4 text-[13px] text-brand-muted">
            <span className="font-semibold text-brand-navy">Upload audio</span>
            <span>{form.audioFileName || 'Choose an audio file to attach to this lesson.'}</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={async event => {
                const file = event.target.files?.[0];
                if (!file) return;
                const dataUrl = await file.arrayBuffer().then(buffer => {
                  const bytes = new Uint8Array(buffer);
                  let binary = '';
                  bytes.forEach(byte => {
                    binary += String.fromCharCode(byte);
                  });
                  return `data:${file.type};base64,${btoa(binary)}`;
                });
                setForm(current => ({
                  ...current,
                  audioFileName: file.name,
                  audioDataUrl: dataUrl,
                  audioUrl: '',
                }));
              }}
            />
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-brand-navy px-4 py-3 text-[13px] font-bold text-white disabled:opacity-60"
            >
              <Plus size={16} />
              {saving ? 'Saving...' : editingId ? 'Update lesson' : 'Create lesson'}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="rounded-2xl border border-[#D8E1EC] px-4 py-3 text-[13px] font-bold">
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </SectionCard>
    </div>
  );
};
