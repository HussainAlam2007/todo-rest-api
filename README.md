# 📝 Todo REST API

A REST API built with Node.js, Express and MongoDB.

## Features
- Create Read Update Delete todos
- Search by title
- Sort by date
- Pagination
- Toggle completion status
- Input validation and error handling

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- CORS

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/todos/add | Create todo |
| GET | /api/todos/ | Get all todos |
| GET | /api/todos/:id | Get one todo |
| PUT | /api/todos/:id | Update todo |
| PATCH | /api/todos/:id/toggle | Toggle complete |
| DELETE | /api/todos/:id | Delete todo |

## Run Locally
npm install
npm run dev
