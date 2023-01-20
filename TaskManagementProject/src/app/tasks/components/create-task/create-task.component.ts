import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from './../../services/tasks.service';
import { TaskData } from './../../models/task-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PriorityData } from '../../models/priority-data.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private taskService: TasksService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  public form!: FormGroup;
  public task!: TaskData;
  public priorities!: PriorityData[];
  public taskId!: string;
  private userId =
    localStorage.getItem('USER_ID') != null
      ? localStorage.getItem('USER_ID')
      : '';

  ngOnInit(): void {
    this.buildForm();
    this.getPriorities();
    this.taskId = this.activatedRouter.snapshot.params['id'];
    if (this.taskId) {
      this.updateForm();
    }
  }

  public buildForm(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      content: new FormControl(),
      date: new FormControl(),
      isFinished: new FormGroup({
        status: new FormControl(),
      }),
      priority: new FormGroup({
        level: new FormControl(),
      }),
    });
  }

  public onSubmit(): void {
    const task = this.form.getRawValue();

    if (this.taskId) {
      this.taskService.editTask(task, this.taskId).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      if(this.userId){
        this.taskService.createTask(task, this.userId).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

    }
  }

  private getPriorities(): void {
    this.priorities = this.taskService.getPriority();
  }

  private updateForm(): void {
    this.taskService
      .getTaskById(this.taskId)
      .pipe()
      .subscribe({
        next: (res) => {
          const task = res;
          this.form.patchValue(task);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
