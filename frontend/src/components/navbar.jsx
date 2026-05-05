import React from "react";

function Navbar({ user, onSearch }) {
  return (
    <div className="navbar">
      <h2>Notes Management</h2>

      <input
        type="text"
        placeholder="Search notes..."
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="user-box">
        🔔
        <span>{user?.name || "Demo User"}</span>
      </div>
    </div>
  );
}

export default Navbar;