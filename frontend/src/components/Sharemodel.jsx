import React, { useState } from "react";

function ShareModal({ note, onClose, onShare }) {
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("VIEW");

  if (!note) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onShare(note.id, email, permission);
    setEmail("");
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Share Note</h2>
        <p>{note.title}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <select value={permission} onChange={(e) => setPermission(e.target.value)}>
            <option value="VIEW">View</option>
            <option value="EDIT">Edit</option>
          </select>

          <div className="modal-actions">
            <button type="submit">Share</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareModal;