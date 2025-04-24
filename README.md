# HMCTS Task Manager

A task management system for HMCTS caseworkers. Built as part of the April/2025 HMCTS Junior Software Developer coding challenge.

**Status**: Nearing Completion  
**Last Updated**: April 24, 2025

---

## Frontend

**HTML**
- Form and layout structure complete  
- Semantic and accessible markup applied

**CSS**
- Styling to be finalized after full functionality confirmed

**JavaScript (Vanilla)**
- Fully functional task creation, editing, saving, and deletion
- Form validation and clear error handling for user input
- Dynamically renders tasks to the DOM using a reusable `renderTask()` function
- Tasks persist through backend API (no longer in-memory only)
- UI updates reflect backend changes (PUT/DELETE)

---

## Backend

**Tech Stack**
- Node.js
- Express.js
- PostgreSQL (Live and integrated)

**Implemented REST API Routes**
| Method | Endpoint                | Description                   |
|--------|-------------------------|-------------------------------|
| GET    | `/api/tasks`           | Fetch all tasks               |
| GET    | `/api/tasks/:id`       | Fetch single task by ID       |
| POST   | `/api/tasks`           | Add a new task                |
| PUT    | `/api/tasks/:id`       | Update an existing task       |
| DELETE | `/api/tasks/:id`       | Delete a task by ID           |

**Features**
- Full CRUD support using PostgreSQL
- Secure parameterized queries using `pg` module
- Input validation on both frontend and backend
- Comprehensive error handling with user feedback

---

## Testing Summary (April 25, 2025)

All API endpoints tested using browser DevTools and `fetch()`:
- POST: Tasks created and stored in the PostgreSQL database
- GET (all & by ID): Confirmed task retrieval
- PUT: Updated tasks reflect immediately in the frontend
- DELETE: Tasks removed both visually and in database

---

## Runtime Environment (Planned)

- **Electron.js**: Package the full stack app into a cross-platform desktop application

---

## Notes

- Code is clean, modular, and well-commented
- Backend and frontend now communicate fully via RESTful endpoints
- Styling and accessibility improvements to follow GOV.UK design guidelines
- Git used throughout with consistent, meaningful commits
- Project includes progressive enhancements and adheres to best practices

---

##  Upcoming Tasks

- Final styling pass (GOV.UK-inspired layout)
- Add favicon (custom or HMCTS-provided)
- Electron packaging (if time allows)
- Final README polish and documentation pass

---

## Notes

- Code is structured, modular, and readable with clear inline documentation  
- Accessibility and GOV.UK Design Standards will be applied during final styling phase  
- All development tracked using Git with clean, intentional commits  
- Backend and frontend now communicating through live API endpoints
