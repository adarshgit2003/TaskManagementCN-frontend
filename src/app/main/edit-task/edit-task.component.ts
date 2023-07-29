import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from 'src/app/shared/models/task';
import { TasksService } from 'src/app/shared/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  @Output() state = new EventEmitter<boolean>();
  @Output() newTask = new EventEmitter<Task>();
  @Input() task;
  date: String;

  constructor(private taskService: TasksService) {}

  success = false;
  failed = false;

  ngOnInit(): void {
    let dateString = this.task.date;
    this.date = new DatePipe('en-US').transform(dateString, 'yyyy-MM-dd');

    console.log(this.task);
  }

  onSubmit(form: any) {
    console.log(form.value.status);
    this.taskService
      .editTask(
        this.task._id,
        form.value.title,
        form.value.status,
        form.value.Priority,
        new Date(new Date(form.value.date).toISOString()),
        form.value.time ? form.value.time : '',
        form.value.notes ? form.value.notes : '',
        new Date()
        
        
      )
      .subscribe(
        (data: any) => {
          this.success = true;
          form.reset();
          const newTask = {
            _id: data._id,
            title: data.title,
            date: new Date(data.date),
            notes: data.notes,
            status: data.status,
            Priority: data.Priority,
            userId: data.userId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            statusChangedAt: data.statusChangedAt,
          };
          this.newTask.emit(newTask);
          setTimeout(() => {
            this.onClose();
          }, 2000);
        },
        (error) => {}
      );
  }

  onClose() {
    this.state.emit(false);
  }
}
