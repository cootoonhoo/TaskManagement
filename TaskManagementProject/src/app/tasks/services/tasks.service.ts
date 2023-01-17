import { StatusData } from './../models/status-data.model';
import { PriorityData } from './../models/priority-data.model';
import { Injectable } from '@angular/core';
import { TaskData } from '../models/task-data.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  public getPriority(): PriorityData[] {
    return [
      {level: 'baixa'},
      {level: 'normal'},
      {level: 'alta'}
    ];
  }

  public getStatus(): StatusData[] {
    return [
      {status: 'to do'},
      {status: 'done'}
    ];
  }

  public getTasks(): TaskData[] {
    return JSON.parse(localStorage.getItem('TASKS') || '[]');
  }

  public createTask(task: TaskData): void {
    task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      priority: {
        ...task.priority
      },
      status: {
        status: 'to-do'
      }
    };

    const taskList = this.getTasks();

    taskList.push(task);

    localStorage.setItem('TASKS', JSON.stringify(taskList));
  }
}
