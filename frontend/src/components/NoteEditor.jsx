export default function NoteEditor({ form, setForm, onSave, onClear, editing }) {
  return (
    <section className="panel editor-panel">
      <div className="section-title">
        <h2>{editing ? 'Edit Note' : 'Create Note'}</h2>
        <p>Use simple rich-text style content, tags and links.</p>
      </div>
      <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Note title" />
      <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write your note here..." />
      <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Tags: java, exam, project" />
      <div className="button-row">
        <button className="primary-btn" onClick={onSave}>{editing ? 'Update Note' : 'Save Note'}</button>
        <button className="secondary-btn" onClick={onClear}>Clear</button>
      </div>
    </section>
  );
}