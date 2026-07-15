import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

const STORAGE_KEY = 'todo_tasks';
const STORAGE_ID_KEY = 'todo_next_id';

const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    title: 'Set up Angular project',
    description: 'Initialize the Angular application structure',
    status: 'Completed',
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Build task component',
    description: 'Create reusable task component with Input/Output',
    status: 'InProgress',
    createdAt: new Date()
  },
  {
    id: 3,
    title: 'Add unit tests',
    description: 'Write unit tests for service and components',
    status: 'New',
    createdAt: new Date()
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextId = 4;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedId = localStorage.getItem(STORAGE_ID_KEY);

    if (stored) {
      this.tasks = JSON.parse(stored).map((t: Task) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      }));
      this.nextId = storedId ? parseInt(storedId, 10) : this.tasks.length + 1;
    } else {
      this.tasks = [...DEFAULT_TASKS];
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    localStorage.setItem(STORAGE_ID_KEY, String(this.nextId));
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(title: string, description: string): Task {
    const newTask: Task = {
      id: this.nextId++,
      title,
      description,
      status: 'New',
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.saveToStorage();
    return newTask;
  }

  updateTask(id: number, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.tasks[index] = { ...this.tasks[index], ...updates };
    this.saveToStorage();
    return this.tasks[index];
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  getStatuses(): TaskStatus[] {
    return ['New', 'InProgress', 'Rejected', 'Verified', 'Completed'];
  }
}
