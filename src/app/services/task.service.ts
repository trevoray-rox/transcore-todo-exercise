import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
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

  private nextId = 4;

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
    return newTask;
  }

  updateTask(id: number, updates: Partial<Task>): Task | null {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  getStatuses(): TaskStatus[] {
    return ['New', 'InProgress', 'Rejected', 'Verified', 'Completed'];
  }
}
