import Topbar from '../components/Topbar.jsx';

export default function VersionHistoryPage({ selected, versions, loadVersions }) {
  return (
    <>
      <Topbar title="Version History" subtitle="View older note versions and audit editing activity." />
      <section className="panel">
        {!selected && <p className="empty">Select a note from My Notes first, then come here to see its history.</p>}
        {selected && <>
          <div className="section-title"><h2>{selected.title}</h2><p>Previous versions saved during updates.</p></div>
          <button className="secondary-btn" onClick={() => loadVersions(selected.id)}>Refresh History</button>
          <div className="version-list">
            {versions.map(v => <div className="version" key={v.id}><strong>{v.titleSnapshot}</strong><span>{v.savedAt ? new Date(v.savedAt).toLocaleString() : ''}</span><p>{v.contentSnapshot}</p></div>)}
          </div>
          {versions.length === 0 && <p className="empty">No versions yet. Edit this note once to create history.</p>}
        </>}
      </section>
    </>
  );
}