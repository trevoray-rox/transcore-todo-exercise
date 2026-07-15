import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  addTaskForm!: FormGroup;
  filterStatus: TaskStatus | 'All' = 'All';
  statuses: (TaskStatus | 'All')[] = ['All', 'New', 'InProgress', 'Rejected', 'Verified', 'Completed'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.addTaskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: ['']
    });
  }

  get filteredTasks(): Task[] {
    if (this.filterStatus === 'All') return this.tasks;
    return this.tasks.filter(t => t.status === this.filterStatus);
  }

  addTask(): void {
    if (this.addTaskForm.valid) {
      const { title, description } = this.addTaskForm.value;
      const newTask = this.taskService.addTask(title, description);
      this.tasks = this.taskService.getTasks();
      this.addTaskForm.reset();
    }
  }

  onTaskUpdated(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask.id, updatedTask);
    this.tasks = this.taskService.getTasks();
  }

  onTaskDeleted(taskId: number): void {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
  }

  get taskSummary(): string {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.status === 'Completed').length;
    return `${completed} of ${total} tasks completed`;
  }
}
