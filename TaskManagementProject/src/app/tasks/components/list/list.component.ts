import { TaskData } from './../../models/task-data.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TaskResponse } from '../../models/task-response.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(private taskService: TasksService, private router: Router) {}

  public tasks!: TaskData[];
  private unsubscribe = new Subject();

  ngOnInit(): void {
    this.getTasks();
    this.taskService.getTasksByStatus('to-do');
  }

  private getTasks(): void {
    this.taskService
      .getTasks()
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

  public getTasksByType(filterId: string): void {
    if (filterId == '') {
      this.taskService
        .getTasks()
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((tasks: TaskData[]) => {
          this.tasks = tasks;
        });
    } else {
      this.taskService.getTasksByStatus(filterId);
    }
  }

  public editTask(id: string): void {
    this.router.navigate(['/tasks/edit/', id]);
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id)
    .subscribe({
      next: (res: TaskResponse) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log('Error message:', error)
      },
      complete: () => {
        this.getTasks();
      }
    });
  }

  public addTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  public changeStatus(task: TaskData): void {
    this.taskService.changeStatus(task).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.log(err);
      },
    });;

    this.getTasksByType('to-do');
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }
}
