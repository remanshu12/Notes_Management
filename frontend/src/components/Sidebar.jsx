export default function Sidebar({ activePage, setActivePage, realtime, user }) {
  const items = [
    ['dashboard', 'Dashboard'],
    ['notes', 'My Notes'],
    ['shared', 'Shared Notes'],
    ['groups', 'Groups'],
    ['notifications', 'Notifications'],
    ['history', 'Version History']
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">N</div>
        <div>
          <h2>NoteSphere</h2>
          <p>Notes Management System</p>
        </div>
      </div>

      <nav>
        {items.map(([key, label]) => (
          <button key={key} className={activePage === key ? 'nav active' : 'nav'} onClick={() => setActivePage(key)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="status-card">
        <span className={realtime === 'Connected' ? 'dot online' : 'dot'}></span>
        <div>
          <strong>{realtime}</strong>
          <p>Real-time collaboration</p>
        </div>
      </div>

      {user && <div className="user-card"><strong>{user.name}</strong><p>{user.email}</p></div>}
    </aside>
  );
}