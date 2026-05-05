# Architecture Diagram

```text
+----------------------+       REST API        +-------------------------+
|                      |  ------------------>  |                         |
| React Frontend       |                       | Spring Boot Backend     |
| Vite + Axios         |  <------------------  | REST Controllers        |
| STOMP Client         |                       | Services + Repositories |
|                      |       WebSocket       | WebSocket Broker        |
+----------+-----------+  <---------------->   +------------+------------+
           |                                                |
           |                                                |
           v                                                v
+----------------------+                         +-------------------------+
| Browser UI           |                         | H2 / PostgreSQL / MySQL |
| Notes, Tags, Search  |                         | Notes, Users, Tags      |
| Comments, Sharing    |                         | Shares, Versions        |
+----------------------+                         +-------------------------+
```

## Layered Design

1. Frontend Layer
   - Provides notes dashboard, editor, search bar, tag filter, comments and real-time status.

2. API Layer
   - REST controllers expose endpoints for notes, users, groups, comments, shares and notifications.

3. Service Layer
   - Business logic for note creation, tag resolution and version history.

4. Persistence Layer
   - Spring Data JPA repositories communicate with the database.

5. Real-Time Layer
   - Spring WebSocket broadcasts note edit events to all connected users.

## Scalability Improvements

For a production version:

- Replace H2 with PostgreSQL or MySQL.
- Add Redis for active collaboration sessions and notification caching.
- Add JWT authentication.
- Add permission checks before edit/comment/view operations.
- Add full-text search using PostgreSQL indexes or Elasticsearch.
- Use operational transform or CRDT for advanced Google Docs-like collaboration.
