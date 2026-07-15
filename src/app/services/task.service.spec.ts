import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks()', () => {
    it('should return the initial list of tasks', () => {
      const tasks = service.getTasks();
      expect(tasks.length).toBeGreaterThan(0);
    });

    it('should return a copy of the tasks array, not a reference', () => {
      const tasks1 = service.getTasks();
      const tasks2 = service.getTasks();
      expect(tasks1).not.toBe(tasks2);
    });
  });

  describe('addTask()', () => {
    it('should add a new task with status New', () => {
      const countBefore = service.getTasks().length;
      service.addTask('Test Task', 'Test Description');
      const countAfter = service.getTasks().length;
      expect(countAfter).toBe(countBefore + 1);
    });

    it('should set the default status to New', () => {
      service.addTask('New Task', 'Description');
      const tasks = service.getTasks();
      const newTask = tasks[tasks.length - 1];
      expect(newTask.status).toBe('New');
    });

    it('should assign a unique id to each new task', () => {
      const task1 = service.addTask('Task 1', '');
      const task2 = service.addTask('Task 2', '');
      expect(task1.id).not.toBe(task2.id);
    });

    it('should store the correct title and description', () => {
      const task = service.addTask('My Title', 'My Description');
      expect(task.title).toBe('My Title');
      expect(task.description).toBe('My Description');
    });
  });

  describe('updateTask()', () => {
    it('should update the status of an existing task', () => {
      const task = service.addTask('Update Me', '');
      service.updateTask(task.id, { status: 'InProgress' });
      const tasks = service.getTasks();
      const updated = tasks.find(t => t.id === task.id);
      expect(updated?.status).toBe('InProgress');
    });

    it('should update the title of an existing task', () => {
      const task = service.addTask('Old Title', '');
      service.updateTask(task.id, { title: 'New Title' });
      const tasks = service.getTasks();
      const updated = tasks.find(t => t.id === task.id);
      expect(updated?.title).toBe('New Title');
    });

    it('should return null if task id does not exist', () => {
      const result = service.updateTask(99999, { status: 'Completed' });
      expect(result).toBeNull();
    });
  });

  describe('deleteTask()', () => {
    it('should remove the task with the given id', () => {
      const task = service.addTask('Delete Me', '');
      const countBefore = service.getTasks().length;
      service.deleteTask(task.id);
      const countAfter = service.getTasks().length;
      expect(countAfter).toBe(countBefore - 1);
    });

    it('should return true when task is successfully deleted', () => {
      const task = service.addTask('Delete Me', '');
      const result = service.deleteTask(task.id);
      expect(result).toBe(true);
    });

    it('should return false when task id does not exist', () => {
      const result = service.deleteTask(99999);
      expect(result).toBe(false);
    });

    it('should not remove other tasks when deleting one', () => {
      const task1 = service.addTask('Keep Me', '');
      const task2 = service.addTask('Delete Me', '');
      service.deleteTask(task2.id);
      const tasks = service.getTasks();
      const kept = tasks.find(t => t.id === task1.id);
      expect(kept).toBeTruthy();
    });
  });

  describe('getStatuses()', () => {
    it('should return all 5 valid statuses', () => {
      const statuses = service.getStatuses();
      expect(statuses.length).toBe(5);
      expect(statuses).toContain('New');
      expect(statuses).toContain('InProgress');
      expect(statuses).toContain('Rejected');
      expect(statuses).toContain('Verified');
      expect(statuses).toContain('Completed');
    });
  });
});

