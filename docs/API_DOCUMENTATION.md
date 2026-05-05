# API Documentation

Base URL: `http://localhost:8080`

## Create User
POST `/api/users`

```json
{
  "name": "Shubham",
  "email": "shubham@example.com",
  "password": "123456"
}
```

## Create Note
POST `/api/notes`

```json
{
  "title": "Java Notes",
  "content": "Inheritance, polymorphism and abstraction",
  "ownerId": 1,
  "tags": ["java", "oops", "exam"]
}
```

## Update Note
PUT `/api/notes/1`

```json
{
  "title": "Updated Java Notes",
  "content": "Updated content",
  "ownerId": 1,
  "tags": ["java", "placement"]
}
```

Before update, the old note is stored in `NoteVersion`.

## Search Notes
GET `/api/notes/search?keyword=java`

## Filter by Tag
GET `/api/notes/tag/java`

## Share Note
POST `/api/shares`

```json
{
  "noteId": 1,
  "userId": 2,
  "groupId": null,
  "permission": "EDIT"
}
```

Permission values:

- VIEW
- COMMENT
- EDIT

## Add Comment
POST `/api/comments`

```json
{
  "noteId": 1,
  "authorId": 1,
  "message": "Please improve this definition."
}
```

## WebSocket Collaboration

Connect to `/ws` using SockJS/STOMP.

Send message to `/app/note.edit`:

```json
{
  "noteId": 1,
  "userId": 1,
  "title": "Live title",
  "content": "Live content",
  "eventType": "EDIT"
}
```

All connected clients receive it from `/topic/notes`.
