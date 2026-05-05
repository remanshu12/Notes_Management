# Database Schema

## app_user
- id: primary key
- name
- email: unique
- password
- created_at

## note
- id: primary key
- title
- content
- owner_id: foreign key to app_user
- archived
- created_at
- updated_at

## tag
- id: primary key
- name: unique

## note_tags
- note_id
- tags_id

## team_group
- id: primary key
- name

## team_group_members
- team_group_id
- members_id

## note_share
- id: primary key
- note_id
- shared_with_user_id
- shared_with_group_id
- permission: VIEW / COMMENT / EDIT
- created_at

## comment
- id: primary key
- note_id
- author_id
- message
- created_at

## note_version
- id: primary key
- note_id
- title
- content
- edited_by_id
- saved_at

## notification
- id: primary key
- recipient_id
- message
- seen
- created_at
