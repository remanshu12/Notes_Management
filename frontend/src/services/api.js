import axios from 'axios';

export const API_BASE = 'http://localhost:8080/api';
const api = axios.create({ baseURL: API_BASE });

export const defaultUser = { name: 'Demo User', email: 'demo@notes.com', password: 'demo' };

export async function bootstrapUser() {
  const users = await api.get('/users');
  if (users.data.length > 0) return users.data[0];
  const created = await api.post('/users', defaultUser);
  return created.data;
}

export const noteApi = {
  all: () => api.get('/notes').then(r => r.data),
  create: payload => api.post('/notes', payload).then(r => r.data),
  update: (id, payload) => api.put(`/notes/${id}`, payload).then(r => r.data),
  remove: id => api.delete(`/notes/${id}`),
  search: keyword => api.get('/notes/search', { params: { keyword } }).then(r => r.data),
  byTag: tag => api.get(`/notes/tag/${tag}`).then(r => r.data),
  versions: id => api.get(`/notes/${id}/versions`).then(r => r.data)
};

export const commentApi = {
  byNote: noteId => api.get(`/comments/note/${noteId}`).then(r => r.data),
  create: payload => api.post('/comments', payload).then(r => r.data)
};

export const shareApi = {
  all: () => api.get('/shares').then(r => r.data),
  create: payload => api.post('/shares', payload).then(r => r.data)
};

export const groupApi = {
  all: () => api.get('/groups').then(r => r.data),
  create: payload => api.post('/groups', payload).then(r => r.data)
};

export const notificationApi = {
  all: () => api.get('/notifications').then(r => r.data),
  create: payload => api.post('/notifications', payload).then(r => r.data)
};

export default api;