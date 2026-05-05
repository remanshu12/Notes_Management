// Polyfill for sockjs-client
if (typeof global === 'undefined') {
  window.global = window;
}

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import './style.css';
import Sidebar from './components/Sidebar.jsx';
import ShareModal from './components/ShareModal.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotesPage from './pages/NotesPage.jsx';
import SharedNotesPage from './pages/SharedNotesPage.jsx';
import GroupsPage from './pages/GroupsPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import VersionHistoryPage from './pages/VersionHistoryPage.jsx';
import { API_BASE, bootstrapUser, noteApi, commentApi, shareApi, groupApi, notificationApi } from './services/api.js';

const emptyForm = { title: '', content: '', tags: '' };

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [shares, setShares] = useState([]);
  const [groups, setGroups] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [versions, setVersions] = useState([]);
  const [realtime, setRealtime] = useState('Disconnected');
  const [shareNote, setShareNote] = useState(null);
  const [shareForm, setShareForm] = useState({ userId: '', groupId: '', permission: 'VIEW' });

  useEffect(() => { boot(); connectSocket(); }, []);
  useEffect(() => { if (selected) { loadComments(selected.id); loadVersions(selected.id); } }, [selected]);

  async function boot() {
    const active = await bootstrapUser();
    setUser(active);
    await Promise.all([loadNotes(), loadShares(), loadGroups(), loadNotifications()]);
  }

  function connectSocket() {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_BASE.replace('/api', '')}/ws`),
      onConnect: () => setRealtime('Connected'),
      onDisconnect: () => setRealtime('Disconnected'),
      onStompError: () => setRealtime('Error')
    });
    client.activate();
  }

  async function loadNotes() { setNotes(await noteApi.all()); }
  async function loadShares() { setShares(await shareApi.all()); }
  async function loadGroups() { setGroups(await groupApi.all()); }
  async function loadNotifications() { setNotifications(await notificationApi.all()); }
  async function loadVersions(id) { setVersions(await noteApi.versions(id)); }
  async function loadComments(noteId) { setComments(await commentApi.byNote(noteId)); }
  async function searchNotes() { if (!keyword.trim()) return loadNotes(); setNotes(await noteApi.search(keyword)); }

  function clearForm() { setForm(emptyForm); setEditing(null); setActivePage('notes'); }
  function editNote(note) {
    setEditing(note.id);
    setSelected(note);
    setForm({ title: note.title, content: note.content, tags: (note.tags || []).map(t => t.name).join(', ') });
    setActivePage('notes');
  }

  async function saveNote() {
    if (!form.title.trim()) return alert('Please enter note title');
    const payload = { ...form, ownerId: user?.id || 1 };
    const saved = editing ? await noteApi.update(editing, payload) : await noteApi.create(payload);
    setSelected(saved);
    setEditing(null);
    setForm(emptyForm);
    await loadNotes();
    await notificationApi.create({ message: `Note ${editing ? 'updated' : 'created'}: ${saved.title}`, user });
    await loadNotifications();
  }

  async function deleteNote(id) {
    if (!confirm('Delete this note?')) return;
    await noteApi.remove(id);
    if (selected?.id === id) setSelected(null);
    await loadNotes();
  }

  async function addComment() {
    if (!selected || !comment.trim()) return;
    await commentApi.create({ noteId: selected.id, authorId: user.id, message: comment });
    setComment('');
    await loadComments(selected.id);
    await notificationApi.create({ message: `New comment on ${selected.title}`, user });
    await loadNotifications();
  }

  function openShare(note) { setShareNote(note); setShareForm({ userId: '', groupId: '', permission: 'VIEW' }); }
  async function submitShare() {
    await shareApi.create({ noteId: shareNote.id, userId: shareForm.userId || null, groupId: shareForm.groupId || null, permission: shareForm.permission });
    setShareNote(null);
    await loadShares();
    await notificationApi.create({ message: `Note shared: ${shareNote.title}`, user });
    await loadNotifications();
  }

  async function createGroup(name) {
    if (!name.trim()) return;
    await groupApi.create({ name });
    await loadGroups();
  }

  const pageProps = { notes, selected, setSelected, keyword, setKeyword, searchNotes, loadNotes, form, setForm, editing, saveNote, clearForm, editNote, deleteNote, openShare, comments, comment, setComment, addComment };

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} realtime={realtime} user={user} />
      <main className="content">
        {activePage === 'dashboard' && <Dashboard notes={notes} notifications={notifications} shares={shares} setActivePage={setActivePage} />}
        {activePage === 'notes' && <NotesPage {...pageProps} />}
        {activePage === 'shared' && <SharedNotesPage shares={shares} />}
        {activePage === 'groups' && <GroupsPage groups={groups} createGroup={createGroup} />}
        {activePage === 'notifications' && <NotificationsPage notifications={notifications} />}
        {activePage === 'history' && <VersionHistoryPage selected={selected} versions={versions} loadVersions={loadVersions} />}
      </main>
      <ShareModal note={shareNote} onClose={() => setShareNote(null)} shareForm={shareForm} setShareForm={setShareForm} onShare={submitShare} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);