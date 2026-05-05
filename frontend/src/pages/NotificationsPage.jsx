import Topbar from '../components/Topbar.jsx';

export default function NotificationsPage({ notifications }) {
  return (
    <>
      <Topbar title="Notifications" subtitle="Updates for shared notes, comments and collaboration activity." />
      <section className="panel">
        {notifications.map(n => <div className="notification" key={n.id}><strong>{n.message}</strong><p>{n.createdAt ? new Date(n.createdAt).toLocaleString() : 'Recently'}</p></div>)}
        {notifications.length === 0 && <p className="empty">No notifications yet.</p>}
      </section>
    </>
  );
}