import Topbar from '../components/Topbar.jsx';
import NoteCard from '../components/NoteCard.jsx';
import NoteEditor from '../components/NoteEditor.jsx';
import CommentBox from '../components/CommentBox.jsx';

export default function NotesPage(props) {
  const { notes, selected, setSelected, keyword, setKeyword, searchNotes, loadNotes, form, setForm, editing, saveNote, clearForm, editNote, deleteNote, openShare, comments, comment, setComment, addComment } = props;
  return (
    <>
      <Topbar title="My Notes" subtitle="Create, edit, tag, search and manage personal notes." onNewNote={clearForm} />
      <div className="search-row">
        <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search by keyword" />
        <button onClick={searchNotes}>Search</button>
        <button className="secondary-btn" onClick={loadNotes}>Reset</button>
      </div>
      <div className="two-column">
        <section className="panel notes-list">
          <div className="section-title"><h2>Notes</h2><p>{notes.length} notes found</p></div>
          {notes.map(note => <NoteCard key={note.id} note={note} selected={selected} onSelect={setSelected} onEdit={editNote} onDelete={deleteNote} />)}
        </section>
        <div className="stack">
          <NoteEditor form={form} setForm={setForm} onSave={saveNote} onClear={clearForm} editing={editing} />
          {selected && <button className="primary-btn wide" onClick={() => openShare(selected)}>Share Selected Note</button>}
          <CommentBox selected={selected} comments={comments} comment={comment} setComment={setComment} onAddComment={addComment} />
        </div>
      </div>
    </>
  );
}