import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    status: 'New',
    createdAt: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [ReactiveFormsModule],
      providers: [TaskService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Task');
  });

  it('should start in view mode not edit mode', () => {
    expect(component.isEditing).toBe(false);
  });

  it('should toggle to edit mode when toggleEdit is called', () => {
    component.toggleEdit();
    expect(component.isEditing).toBe(true);
  });

  it('should toggle back to view mode when toggleEdit is called again', () => {
    component.toggleEdit();
    component.toggleEdit();
    expect(component.isEditing).toBe(false);
  });

  it('should populate edit form with task values when entering edit mode', () => {
    component.toggleEdit();
    expect(component.editForm.get('title')?.value).toBe('Test Task');
    expect(component.editForm.get('description')?.value).toBe('Test Description');
    expect(component.editForm.get('status')?.value).toBe('New');
  });

  it('should emit taskUpdated with Completed status when markCompleted is called', () => {
    spyOn(component.taskUpdated, 'emit');
    component.markCompleted();
    expect(component.taskUpdated.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ status: 'Completed' })
    );
  });

  it('should emit taskDeleted with correct id when deleteTask is called', () => {
    spyOn(component.taskDeleted, 'emit');
    component.deleteTask();
    expect(component.taskDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should emit taskUpdated when saveTask is called with valid form', () => {
    spyOn(component.taskUpdated, 'emit');
    component.toggleEdit();
    component.editForm.setValue({
      title: 'Updated Title',
      description: 'Updated Description',
      status: 'InProgress'
    });
    component.saveTask();
    expect(component.taskUpdated.emit).toHaveBeenCalled();
  });

  it('should not emit taskUpdated when saveTask is called with invalid form', () => {
    spyOn(component.taskUpdated, 'emit');
    component.toggleEdit();
    component.editForm.setValue({ title: '', description: '', status: 'New' });
    component.saveTask();
    expect(component.taskUpdated.emit).not.toHaveBeenCalled();
  });

  it('should return correct status CSS class', () => {
    expect(component.getStatusClass('New')).toBe('status-new');
    expect(component.getStatusClass('InProgress')).toBe('status-inprogress');
    expect(component.getStatusClass('Rejected')).toBe('status-rejected');
    expect(component.getStatusClass('Verified')).toBe('status-verified');
    expect(component.getStatusClass('Completed')).toBe('status-completed');
  });

  it('should load all valid statuses', () => {
    expect(component.statuses.length).toBe(5);
  });
});
