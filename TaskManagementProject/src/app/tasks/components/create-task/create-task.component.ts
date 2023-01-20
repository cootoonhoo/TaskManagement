import { UpdateTaskData } from './../../models/update-task-data.model';
import { CreateTaskData } from './../../models/create-task-data.model';
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

  private updateTask!: UpdateTaskData;
  private createTask!: CreateTaskData;

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
      date: new FormControl(new Date()),
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

    if (this.taskId)
    {
      this.updateTask =  {
        content: task.content,
        date: task.date,
        isFinished: task.isFinished.id,
        priority: task.priority.level
      };

      this.taskService.editTask(this.updateTask, this.taskId).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    else
    {
      if(this.userId){
        this.createTask =  {
          content: task.content,
          date: task.date,
          priority: task.priority.level
        };

        this.taskService.createTask(this.createTask, this.userId).subscribe({
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
