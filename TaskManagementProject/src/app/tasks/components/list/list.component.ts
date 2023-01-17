import { TaskData } from './../../models/task-data.model';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private taskService: TasksService) { }

  public tasks!: TaskData[];

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

}
