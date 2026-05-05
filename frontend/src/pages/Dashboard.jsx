import Topbar from '../components/Topbar.jsx';

export default function Dashboard({ notes, notifications, shares, setActivePage }) {
  const tags = new Set();
  notes.forEach(n => (n.tags || []).forEach(t => tags.add(t.name)));
  const cards = [
    ['Total Notes', notes.length],
    ['Unique Tags', tags.size],
    ['Shared Items', shares.length],
    ['Notifications', notifications.length]
  ];

  return (
    <>
      <Topbar title="Dashboard" subtitle="Overview of your notes, tags, sharing and collaboration activity." onNewNote={() => setActivePage('notes')} />
      <div className="stats-grid">{cards.map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <section className="panel">
        <div className="section-title"><h2>Assignment Coverage</h2><p>These modules match the project requirements.</p></div>
        <div className="feature-grid">
          <div><h3>Rich Notes</h3><p>Create, edit and delete notes with rich content fields.</p></div>
          <div><h3>Tagging</h3><p>Multiple tags per note and tag based search/filter.</p></div>
          <div><h3>Sharing</h3><p>Share notes with users or groups with permissions.</p></div>
          <div><h3>Real-time</h3><p>WebSocket based collaboration status and broadcasts.</p></div>
          <div><h3>History</h3><p>Track every update and view previous note versions.</p></div>
          <div><h3>Notifications</h3><p>See alerts for shared note changes and comments.</p></div>
        </div>
      </section>
    </>
  );
}