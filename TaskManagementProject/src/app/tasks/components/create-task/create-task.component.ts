import { TasksService } from './../../services/tasks.service';
import { TaskData } from './../../models/task-data.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PriorityData } from '../../models/priority-data.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})

export class CreateTaskComponent implements OnInit {

  constructor(private taskService: TasksService) { }

  public form!: FormGroup;
  public task!: TaskData;
  public priorities!: PriorityData[];

  ngOnInit(): void {
    this.buildForm();
    this.getPriorities();
  }

  public buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      title: new FormControl(),
      description: new FormControl(),
      createdAt: new FormControl(),
      status: new FormGroup({
        status: new FormControl()
      }),
      priority: new FormGroup({
        level: new FormControl()
      })
    });
  }

  public onSubmit(): void {
    this.task = this.form.getRawValue();

    this.taskService.createTask(this.task);
    alert('Tarefa adicionada com sucesso');

    console.log(this.task)

    this.form.reset();
  }

  private getPriorities(): void {
    this.priorities = this.taskService.getPriority();
  }

}
