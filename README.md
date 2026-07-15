# Angular Todo App

A simple task management application built with Angular 16 demonstrating:

- Component-based architecture with reusable `TaskComponent`
- `@Input()` and `@Output()` decorators for parent-child communication
- Reactive Forms with validation
- Property binding and event binding
- Service layer for data management (in-memory storage)
- Status management with typed `TaskStatus` enum

## Task Statuses

- **New** - Default status for new tasks
- **InProgress** - Task is being worked on
- **Rejected** - Task has been rejected
- **Verified** - Task has been verified
- **Completed** - Task is done

## Features

- Add new tasks with title and optional description
- Edit existing tasks including title, description, and status
- Mark tasks as completed with one click
- Delete tasks
- Filter tasks by status

## Setup

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Navigate to http://localhost:4200
```

## Project Structure

```
src/
  app/
    components/
      task/
        task.component.ts      # Reusable task component
        task.component.html    # Task template
        task.component.css     # Task styles
    models/
      task.model.ts            # Task interface and TaskStatus type
    services/
      task.service.ts          # In-memory data service
    app.component.ts           # Main app component
    app.component.html         # Main template
    app.component.css          # App styles
    app.module.ts              # Angular module
```
