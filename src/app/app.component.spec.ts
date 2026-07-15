import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TaskComponent],
      imports: [ReactiveFormsModule],
      providers: [TaskService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with tasks from the service', () => {
    expect(component.tasks.length).toBeGreaterThan(0);
  });

  it('should initialize the add task form', () => {
    expect(component.addTaskForm).toBeTruthy();
    expect(component.addTaskForm.get('title')).toBeTruthy();
    expect(component.addTaskForm.get('description')).toBeTruthy();
  });

  it('should not add a task if the form is invalid', () => {
    const countBefore = component.tasks.length;
    component.addTaskForm.setValue({ title: '', description: '' });
    component.addTask();
    expect(component.tasks.length).toBe(countBefore);
  });

  it('should add a task when form is valid', () => {
    const countBefore = component.tasks.length;
    component.addTaskForm.setValue({ title: 'New Task', description: 'Description' });
    component.addTask();
    expect(component.tasks.length).toBe(countBefore + 1);
  });

  it('should reset the form after adding a task', () => {
    component.addTaskForm.setValue({ title: 'New Task', description: 'Description' });
    component.addTask();
    expect(component.addTaskForm.get('title')?.value).toBeNull();
  });

  it('should remove a task when onTaskDeleted is called', () => {
    const tasksBefore = component.tasks.length;
    const firstTaskId = component.tasks[0].id;
    component.onTaskDeleted(firstTaskId);
    expect(component.tasks.length).toBe(tasksBefore - 1);
  });

  it('should update a task when onTaskUpdated is called', () => {
    const task = component.tasks[0];
    const updatedTask: Task = { ...task, status: 'Completed' };
    component.onTaskUpdated(updatedTask);
    const found = component.tasks.find(t => t.id === task.id);
    expect(found?.status).toBe('Completed');
  });

  it('should filter tasks by status', () => {
    component.filterStatus = 'Completed';
    const filtered = component.filteredTasks;
    filtered.forEach(t => expect(t.status).toBe('Completed'));
  });

  it('should return all tasks when filter is All', () => {
    component.filterStatus = 'All';
    expect(component.filteredTasks.length).toBe(component.tasks.length);
  });

  it('should show correct task summary', () => {
    const summary = component.taskSummary;
    expect(summary).toContain('tasks completed');
  });
});
