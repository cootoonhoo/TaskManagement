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

  public getTasksByStatus(status: string): TaskData[] {
    const taskList = this.getTasks();

    return taskList.filter(e => e.status.status === status)
  }

  public getTaskById(id: string): TaskData {
    const tasks = this.getTasks();

    return tasks.find((task) => task.id === id) as TaskData;
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

  public editTask(task: TaskData): void {
    const taskList = this.getTasks();
    const taskIndex = taskList.findIndex(t => t.id === task.id);

    taskList[taskIndex] = task;

    localStorage.setItem('TASKS', JSON.stringify(taskList));
  }

  public deleteTask(id: string): void {
    const taskList = this.getTasks();
    const taskIndex = taskList.findIndex(t => t.id === id);

    taskList.splice(taskIndex, 1);

    localStorage.setItem('TASKS', JSON.stringify(taskList));
  }

  public changeStatus(id: string): void {
    const taskList = this.getTasks();
    const taskIndex = taskList.findIndex(t => t.id === id);

    const task = taskList[taskIndex];
    task.status.status = 'done';

    localStorage.setItem('TASKS', JSON.stringify(taskList));
  }
}
