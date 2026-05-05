import Topbar from '../components/Topbar.jsx';

export default function SharedNotesPage({ shares }) {
  return (
    <>
      <Topbar title="Shared Notes" subtitle="Notes shared with users and groups using permission levels." />
      <section className="panel">
        <div className="section-title"><h2>Sharing Records</h2><p>VIEW, EDIT and COMMENT permissions are supported.</p></div>
        <table><thead><tr><th>Note</th><th>User</th><th>Group</th><th>Permission</th></tr></thead>
          <tbody>{shares.map(s => <tr key={s.id}><td>{s.note?.title}</td><td>{s.sharedWithUser?.email || '-'}</td><td>{s.sharedWithGroup?.name || '-'}</td><td><span className="pill">{s.permission}</span></td></tr>)}</tbody>
        </table>
        {shares.length === 0 && <p className="empty">No notes shared yet. Open My Notes and click Share Selected Note.</p>}
      </section>
    </>
  );
}