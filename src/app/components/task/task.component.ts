import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  editForm!: FormGroup;
  isEditing = false;
  statuses: TaskStatus[] = [];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.statuses = this.taskService.getStatuses();
    this.editForm = this.fb.group({
      title: [this.task.title, [Validators.required, Validators.minLength(1)]],
      description: [this.task.description],
      status: [this.task.status, Validators.required]
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status
      });
    }
  }

  saveTask(): void {
    if (this.editForm.valid) {
      const updated: Task = {
        ...this.task,
        title: this.editForm.value.title,
        description: this.editForm.value.description,
        status: this.editForm.value.status
      };
      this.taskUpdated.emit(updated);
      this.isEditing = false;
    }
  }

  markCompleted(): void {
    const updated: Task = { ...this.task, status: 'Completed' };
    this.taskUpdated.emit(updated);
  }

  deleteTask(): void {
    this.taskDeleted.emit(this.task.id);
  }

  getStatusClass(status: TaskStatus): string {
    const classMap: Record<TaskStatus, string> = {
      'New': 'status-new',
      'InProgress': 'status-inprogress',
      'Rejected': 'status-rejected',
      'Verified': 'status-verified',
      'Completed': 'status-completed'
    };
    return classMap[status] || '';
  }
}
