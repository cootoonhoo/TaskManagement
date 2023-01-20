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
  constructor(private taskService: TasksService, private router: Router) {}

  public tasks!: TaskData[];
  public tasksArrayFiltered! : TaskData[];
  public tasksPriorityArray : Array<PriorityData> = [{  id: 0,
    level: "Todas"}];

  private unsubscribe = new Subject();
  private userId =
    localStorage.getItem('USER_ID') != null
      ? localStorage.getItem('USER_ID')
      : '';

  ngOnInit(): void {
    this.getPrioritiesList();
    this.getTasks();
    this.tasksArrayFiltered = this.tasks;
  }

  ngAfterViewInit(): void {
    this.activateButton("Todas");
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
            this.tasksArrayFiltered = this.tasks;
          },
        });
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

  filterList(event: any){

    let priorityId = event.target.id
    console.log(priorityId)

    if(priorityId == 0){
      this.tasksArrayFiltered = this.tasks;
    }
    else {
      this.tasksArrayFiltered = this.tasks.filter( e => e.priority == priorityId)
    }
    console.log(this.tasksArrayFiltered)
    console.log(this.tasks)
  }

  activateButton(id: string) {

    let disableButton = document.querySelector(".selected");
    if(disableButton !== null){
      disableButton.classList.remove("selected");
    }

    let button = document.getElementById(id);
    if(button !== null){
      button.classList.add("selected");
    }
  }

  getPrioritiesList() {
    let priorityList = this.taskService.getPriority();
    for (let index = 0; index < priorityList.length; index++) {
      const priority = priorityList[index];
      this.tasksPriorityArray.push(priority);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.complete();
  }


}
