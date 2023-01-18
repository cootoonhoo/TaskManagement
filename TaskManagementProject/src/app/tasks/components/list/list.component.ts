import { TaskData } from './../../models/task-data.model';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private taskService: TasksService, private router: Router) { }

  public tasks!: TaskData[];

  ngOnInit(): void {
    this.getTasks();
    this.tasks = this.taskService.getTasksByStatus('to-do');
  }

  private getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  public getTasksByType(filterId: string): void {
    if (filterId == '') {
      this.tasks = this.taskService.getTasks();
    } else {
      this.tasks = this.taskService.getTasksByStatus(filterId);
    }
  }

  public editTask(id: string): void {
    this.router.navigate(['/tasks/edit/', id]);
  }

  public deleteTask(id: string): void {
    this.taskService.deleteTask(id);

    alert('Usuário deletado com sucesso!');

    this.getTasks();
    this.router.navigate(['/tasks']);
  }

  public changeStatus(id: string): void {
    this.taskService.changeStatus(id);

    this.getTasksByType('to-do');
    this.router.navigate(['/tasks']);
  }

}
