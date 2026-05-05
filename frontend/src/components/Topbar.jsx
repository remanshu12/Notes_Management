export default function Topbar({ title, subtitle, onNewNote }) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {onNewNote && <button className="primary-btn" onClick={onNewNote}>+ New Note</button>}
    </header>
  );
}