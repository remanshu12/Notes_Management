export default function ShareModal({ note, onClose, shareForm, setShareForm, onShare }) {
  if (!note) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="section-title">
          <h2>Share Note</h2>
          <p>{note.title}</p>
        </div>
        <input placeholder="User ID" value={shareForm.userId} onChange={e => setShareForm({ ...shareForm, userId: e.target.value })} />
        <input placeholder="Group ID" value={shareForm.groupId} onChange={e => setShareForm({ ...shareForm, groupId: e.target.value })} />
        <select value={shareForm.permission} onChange={e => setShareForm({ ...shareForm, permission: e.target.value })}>
          <option>VIEW</option>
          <option>EDIT</option>
          <option>COMMENT</option>
        </select>
        <div className="button-row">
          <button className="primary-btn" onClick={onShare}>Share</button>
          <button className="secondary-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}