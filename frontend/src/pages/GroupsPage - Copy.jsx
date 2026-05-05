import { useState } from 'react';
import Topbar from '../components/Topbar.jsx';

export default function GroupsPage({ groups, createGroup }) {
  const [name, setName] = useState('');
  return (
    <>
      <Topbar title="Groups" subtitle="Create teams and share notes with multiple collaborators." />
      <div className="two-column small-right">
        <section className="panel">
          <div className="section-title"><h2>Create Group</h2><p>Example: Project Team, Study Group, Office Team</p></div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Group name" />
          <button className="primary-btn" onClick={() => { createGroup(name); setName(''); }}>Create Group</button>
        </section>
        <section className="panel">
          <div className="section-title"><h2>Available Groups</h2><p>{groups.length} groups</p></div>
          {groups.map(g => <div className="list-item" key={g.id}><strong>{g.name}</strong><span>Group ID: {g.id}</span></div>)}
          {groups.length === 0 && <p className="empty">No groups created yet.</p>}
        </section>
      </div>
    </>
  );
}