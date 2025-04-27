# HMCTS Task Manager

A task management system designed to help HMCTS caseworkers efficiently manage their tasks. This project was developed as part of the April 2025 HMCTS Junior Software Developer Coding Challenge.

---

**Status:** COMPLETE  
**Last Updated:** April 25, 2025

---

## Tech Stack

- Frontend: HTML, CSS, JavaScript (Vanilla)
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Optional Packaging: Electron.js (planned phase)

---

## Challenge Requirements Coverage

| Requirement                          | Status      |
|--------------------------------------|-------------|
| Create, view, update, delete tasks   | Implemented |
| Store data in a database             | Implemented |
| RESTful backend API                  | Implemented |
| Input validation and error handling  | Implemented |
| Accessible, user-friendly interface  | Implemented |
| README documentation                 | Included    |

---

## Frontend Overview

### HTML
- Semantic structure with accessible labels and roles
- Form and task display areas clearly separated

### CSS
- Custom theme inspired by GOV.UK Design System, using a dark cyan and yellow palette
- Responsive layout supporting mobile and smaller screens
- Styled input fields, buttons, status indicators, and focus states

### JavaScript
- Handles task creation, editing, updating, and deletion
- Includes form validation and input trimming
- Dynamically renders tasks to the DOM using a reusable render function
- Interacts with backend through fetch API
- Reflects backend updates instantly in the UI

---

## Backend Overview

### REST API Endpoints

| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| GET    | `/api/tasks`         | Retrieve all tasks          |
| GET    | `/api/tasks/:id`     | Retrieve task by ID         |
| POST   | `/api/tasks`         | Create a new task           |
| PUT    | `/api/tasks/:id`     | Update an existing task     |
| DELETE | `/api/tasks/:id`     | Delete a task by ID         |

### Features
- Integrated PostgreSQL database using the `pg` module
- Secure queries using parameterized inputs
- Full input validation on both backend and frontend
- Status codes and error messages returned appropriately

---

## Testing Summary (as of April 24, 2025)

All endpoints have been tested manually using browser DevTools:

- POST: Tasks are saved to the database and rendered
- GET: All and individual task retrieval verified
- PUT: Edits are reflected in both the UI and database
- DELETE: Tasks are removed from both DOM and database

---

## Planned Features

- Add a favicon (custom or HMCTS-provided)
- Electron packaging to enable cross-platform desktop usage

---

## Additional Notes

- The codebase is modular and consistently documented
- Frontend and backend communicate via clean REST API endpoints
- Accessibility and usability were considered throughout development
- Git was used from the beginning with regular, intentional commits
- I enjoyed every part of this challenge, especially the backend set up and database integration. 


