export default function CommentBox({ selected, comments, comment, setComment, onAddComment }) {
  return (
    <section className="panel">
      <div className="section-title"><h2>Comments & Suggestions</h2><p>Collaborators can discuss improvements here.</p></div>
      {!selected && <p className="empty">Select a note to view comments.</p>}
      {selected && <>
        <div className="comment-list">
          {comments.length === 0 && <p className="empty">No comments yet.</p>}
          {comments.map(c => <div className="comment" key={c.id}><strong>{c.author?.name || 'User'}</strong><p>{c.message}</p></div>)}
        </div>
        <div className="comment-form">
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment or suggestion" />
          <button onClick={onAddComment}>Add</button>
        </div>
      </>}
    </section>
  );
}