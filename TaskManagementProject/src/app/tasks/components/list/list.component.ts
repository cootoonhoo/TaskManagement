import { PriorityData } from './../../models/priority-data.model';
import { TaskData } from './../../models/task-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  importancy : number  = 0;
  constructor(private taskService: TasksService, private router: Router) {}
  public tasks!: TaskData[];
  private unsubscribe = new Subject();
  private userId =
    localStorage.getItem('USER_ID') != null
      ? localStorage.getItem('USER_ID')
      : '';

  ngOnInit(): void {
    this.getTasks();
    if(this.userId){
      this.taskService.getTasksByStatus(false, this.userId);
    }
  }

  private getTasks(): void {
    if (this.userId) {
      this.taskService
        .getTasksByUserId(this.userId)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (tasks: TaskData[]) => {
            this.tasks = tasks;
          },
          error: (error: any) => {
            console.log('Error message:', error);
          },
          complete: () => {
            console.log('Finalizado!');
          },
        });
    }
  }

  public getTasksByType(filter: boolean | null): void {
    if (filter == null && this.userId) {
      this.taskService
        .getTasksByUserId(this.userId)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (tasks: TaskData[]) => {
            this.tasks = tasks;
          },
          error: (error: any) => {
            console.log('Error message:', error);
          },
          complete: () => {
            console.log('Finalizado!');
          },
        });
    } else {
      if(this.userId && filter != null) {
        this.taskService.getTasksByStatus(filter, this.userId);
      }

    }
  }

  public editTask(id: string): void {
    this.router.navigate(['/tasks/edit/', id]);
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log('Error message:', error);
      },
      complete: () => {
        this.getTasks();
      },
    });
  }

  public addTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  public changeStatus(task: TaskData): void {
    this.taskService.changeStatus(task.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getTasksByType(false);
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }

  public ChangeBg(priority: number){
      switch (priority) {
        default:
          return "#90ee90"
        case 2:
          return "#FFCCCB"
        case 3:
          return "#FFFFE0"
      }
  }
}
