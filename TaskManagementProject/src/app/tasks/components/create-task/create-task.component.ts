import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private taskService: TasksService, private router: Router, private activatedRouter: ActivatedRoute) { }

  public form!: FormGroup;
  public task!: TaskData;
  public priorities!: PriorityData[];
  public taskId!: string;

  ngOnInit(): void {
    this.buildForm();
    this.getPriorities();
    this.getRouterParam();

    if (this.taskId) {
      this.updateForm();
    }
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

    if (this.taskId) {
      this.taskService.editTask(this.task);
      alert('Tarefa editada com sucesso!');
    } else {
      this.taskService.createTask(this.task);
      alert('Tarefa cadastrada com sucesso!');
    }


    this.form.reset();
    this.router.navigate(['/tasks'])
  }

  private getPriorities(): void {
    this.priorities = this.taskService.getPriority();
  }

  private getRouterParam() {
    this.taskId = this.activatedRouter.snapshot.params['id'];
    this.updateForm();
  }

  private updateForm(): void {
    const task = this.taskService.getTaskById(this.taskId);
    this.form.patchValue(task);
  }

}
