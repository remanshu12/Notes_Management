export default function NoteCard({ note, selected, onSelect, onEdit, onDelete }) {
  const tags = note.tags || [];
  return (
    <article className={selected?.id === note.id ? 'note-card selected' : 'note-card'} onClick={() => onSelect(note)}>
      <div className="note-card-head">
        <h3>{note.title}</h3>
        <span>{note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : 'New'}</span>
      </div>
      <p>{(note.content || '').replace(/<[^>]+>/g, '').slice(0, 130)}...</p>
      <div className="tag-row">
        {tags.map(tag => <span key={tag.id || tag.name} className="tag">#{tag.name}</span>)}
      </div>
      <div className="card-actions" onClick={e => e.stopPropagation()}>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button className="danger-light" onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </article>
  );
}