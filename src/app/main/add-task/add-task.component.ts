import { Component, EventEmitter, Output } from '@angular/core';

import { Task } from 'src/app/shared/models/task';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() state = new EventEmitter<boolean>();
  @Output() newTask = new EventEmitter<Task>();

  constructor(private taskService: TasksService) {}

  success = false;
  failed = false;

  onSubmit(form: any) {
    this.taskService
      .addTask(
        form.value.title,
        form.value.status ? form.value.status : 'to-do',
        form.value.Priority ? form.value.Priority : 'Low',
        form.value.date
          ? new Date(new Date(form.value.date).toISOString())
          : new Date(),
        form.value.time ? form.value.time : '',
        form.value.notes ? form.value.notes : '',
        new Date()
        
      )
      .subscribe(
        (data: any) => {
          this.success = true;
          form.reset();
          const newTask = {
            _id: data.createdTask._id,
            title: data.createdTask.title,
            date: new Date(data.createdTask.date),
            notes: data.createdTask.notes,
            status: data.createdTask.status,
            Priority: data.createdTask.Priority,
            userId: data.createdTask.userId,
            createdAt: new Date(data.createdTask.createdAt),
            updatedAt: new Date(data.createdTask.updatedAt),
            statusChangedAt: new Date(data.createdTask.statusChangedAt)
          };
          this.newTask.emit(newTask);
          setTimeout(() => {
            this.onClose();
          }, 2000);
        },
        (error) => {
          this.failed = true;
        }
      );
  }
  onClose() {
    this.state.emit(false);
  }
}
