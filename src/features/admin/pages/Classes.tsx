import React from 'react';
import { SectionCard } from '@/src/features/admin/components/SectionCard';
import { assignClass, getClasses, getStudents, getTeachers } from '@/src/features/admin/services/adminApi';
import type { AdminClass, AdminUser } from '@/src/features/admin/types';

export const AdminClassesPage = () => {
  const [classes, setClasses] = React.useState<AdminClass[]>([]);
  const [teachers, setTeachers] = React.useState<AdminUser[]>([]);
  const [students, setStudents] = React.useState<AdminUser[]>([]);
  const [selectedClassId, setSelectedClassId] = React.useState<string>('');
  const [teacherId, setTeacherId] = React.useState<string>('');
  const [studentIds, setStudentIds] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [classData, teacherData, studentData] = await Promise.all([getClasses(), getTeachers(), getStudents()]);
      setClasses(classData);
      setTeachers(teacherData);
      setStudents(studentData);
      if (classData[0]) {
        setSelectedClassId(current => current || classData[0].id);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load classes');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const selectedClass = classes.find(item => item.id === selectedClassId) ?? classes[0];

  React.useEffect(() => {
    if (!selectedClass) return;
    setTeacherId(selectedClass.teacherId);
    setStudentIds(selectedClass.studentIds);
  }, [selectedClass]);

  const toggleStudent = (studentId: string) => {
    setStudentIds(current =>
      current.includes(studentId) ? current.filter(id => id !== studentId) : [...current, studentId]
    );
  };

  const save = async () => {
    if (!selectedClass) return;

    try {
      setSaving(true);
      setError(null);
      await assignClass({ classId: selectedClass.id, teacherId, studentIds });
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to update class');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <SectionCard eyebrow="Classes" title="Class list" description="View teacher assignments and enrolled students.">
        {loading ? (
          <div className="rounded-2xl bg-[#F7FAFD] px-4 py-6 text-brand-muted">Loading classes...</div>
        ) : (
          <div className="space-y-4">
            {classes.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedClassId(item.id)}
                className={`w-full rounded-[22px] border p-4 text-left transition-colors ${
                  selectedClass?.id === item.id ? 'border-brand-gold bg-brand-gold/10' : 'border-[#E3EAF2] bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[16px] font-bold text-brand-navy">{item.name}</p>
                    <p className="mt-1 text-[13px] text-brand-muted">Teacher: {item.teacherName}</p>
                  </div>
                  <span className="rounded-full bg-[#EEF3F8] px-3 py-1 text-[11px] font-bold text-brand-muted">
                    {item.studentIds.length} students
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard eyebrow="Assignments" title="Assign students to teachers" description="Use the controls below to manage class membership.">
        {error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        {!selectedClass ? (
          <div className="rounded-2xl bg-[#F7FAFD] px-4 py-6 text-brand-muted">Choose a class to edit assignments.</div>
        ) : (
          <div className="space-y-5">
            <div>
              <p className="text-[13px] font-bold text-brand-navy">Selected class</p>
              <p className="mt-1 text-[14px] text-brand-muted">{selectedClass.name}</p>
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-bold text-brand-navy">Teacher</label>
              <select
                value={teacherId}
                onChange={event => setTeacherId(event.target.value)}
                className="w-full rounded-2xl border border-[#D8E1EC] px-4 py-3"
              >
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-[13px] font-bold text-brand-navy">Students</label>
              <div className="max-h-[280px] space-y-2 overflow-y-auto rounded-2xl border border-[#E3EAF2] p-3">
                {students.map(student => (
                  <label key={student.id} className="flex items-center justify-between rounded-2xl bg-[#F7FAFD] px-4 py-3">
                    <div>
                      <p className="text-[13px] font-bold text-brand-navy">{student.name}</p>
                      <p className="text-[12px] text-brand-muted">{student.email}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={studentIds.includes(student.id)}
                      onChange={() => toggleStudent(student.id)}
                      className="h-4 w-4 rounded border-[#D8E1EC]"
                    />
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={() => void save()}
              disabled={saving}
              className="rounded-2xl bg-brand-navy px-4 py-3 text-[13px] font-bold text-white disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save assignments'}
            </button>
          </div>
        )}
      </SectionCard>
    </div>
  );
};
