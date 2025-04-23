# HMCTS Task Manager

A task management system for HMCTS caseworkers. Built as part of the April/2025 HMCTS Junior Software Developer coding challenge.

**Status**: Work in Progress  
**Last Updated**: April 24, 2025

---

## Frontend

**HTML**  
- Form and layout structure complete

**CSS**  
- To be styled after backend integration

**JavaScript (Vanilla)**  
- Fully functional task creation  
- Tasks include title, description, datetime, and status  
- Tasks render to the DOM on submission  
- Edit, Save, and Delete functionality implemented and working  
- Tasks now sent via POST to the backend API on creation  
- `renderTask()` function modularized and reused for dynamic DOM rendering  
- Input validation and error handling included  
- DOM-safe structure, accessible labels, and semantic markup applied

---

## Backend

**Tech Stack**  
- Node.js  
- Express.js  
- PostgreSQL (coming next)

**Implemented API Routes:**  
- `GET /api/tasks` → Returns all tasks  
- `GET /api/tasks/:id` → Returns a task by ID  
- `POST /api/tasks` → Creates a new task  
- `PUT /api/tasks/:id` → Updates an existing task  
- `DELETE /api/tasks/:id` → Deletes a task by ID

**Features:**  
- Basic input validation  
- In-memory task storage (temporary)  
- JSON response formatting  
- Ready for database integration

---

## Runtime Environment (Planned)

- Electron (to package the app into a cross-platform desktop environment)

---

## Notes

- Code is structured, modular, and readable with clear inline documentation  
- Accessibility and GOV.UK Design Standards will be applied during final styling phase  
- All development tracked using Git with clean, intentional commits  
- Backend and frontend now communicating through live API endpoints