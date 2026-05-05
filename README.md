# Notes Management System with Tagging and Sharing

A full-stack assignment project for a collaborative notes platform.

## Tech Stack

- Frontend: React + Vite + Axios + STOMP WebSocket
- Backend: Java 17 + Spring Boot 3 + Spring Web + Spring Data JPA + Spring Security + Spring WebSocket
- Database: H2 in-memory database for easy demo. You can replace it with PostgreSQL/MySQL later.

## Features

- Create, update, delete notes
- Add multiple tags to each note
- Search notes by title/content
- Filter notes by tag
- User and group entities
- Share notes with user/group with VIEW, COMMENT, EDIT permission
- Add comments/suggestions on notes
- Version history saved before every note update
- WebSocket endpoint for real-time note update broadcasting
- Basic notification API

## How to Run

### 1. Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend starts at:

```text
http://localhost:8080
```

H2 database console:

```text
http://localhost:8080/h2-console
```

Use JDBC URL:

```text
jdbc:h2:mem:notesdb
```

### 2. Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at:

```text
http://localhost:5173
```

## Main API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/users` | Create user |
| GET | `/api/users` | List users |
| POST | `/api/notes` | Create note |
| GET | `/api/notes` | List all notes |
| PUT | `/api/notes/{id}` | Update note |
| DELETE | `/api/notes/{id}` | Delete note |
| GET | `/api/notes/search?keyword=java` | Search notes |
| GET | `/api/notes/tag/project` | Filter by tag |
| GET | `/api/notes/{id}/versions` | Get note versions |
| POST | `/api/comments` | Add comment |
| GET | `/api/comments/note/{noteId}` | Get comments |
| POST | `/api/shares` | Share note |
| GET | `/api/shares` | List shares |
| POST | `/api/groups` | Create group |
| GET | `/api/groups` | List groups |
| GET | `/api/notifications` | List notifications |
| POST | `/api/notifications` | Create notification |

## WebSocket

Endpoint:

```text
/ws
```

Client sends update to:

```text
/app/note.edit
```

Subscribers listen on:

```text
/topic/notes
```

## Note

This project is assignment-ready and demo-friendly. Authentication is currently open using permit-all security so the evaluator can run and test easily. For production, add JWT authentication and enforce note sharing permissions in service methods.
