import { TaskResponse } from './../models/task-response.model';
import { StatusData } from './../models/status-data.model';
import { PriorityData } from './../models/priority-data.model';
import { Injectable } from '@angular/core';
import { TaskData } from '../models/task-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  public getPriority(): PriorityData[] {
    return [
      { id: 1, level: 'baixa' },
      { id: 2, level: 'normal' },
      { id: 3, level: 'alta' },
    ];
  }

  public getStatus(): StatusData[] {
    return [{ id: false, status: 'to do' }, { id: true, status: 'done' }];
  }

  private getTaskList(): TaskData[] {
    return JSON.parse(localStorage.getItem('TASKS') || '[]');
  }

  public getTasks(): Observable<TaskData[]> {
    // const tasks = JSON.parse(localStorage.getItem('TASKS') || '[]');

    // return of(tasks);

    return this.http.get<TaskData[]>('https://localhost:7099/Task');
  }

  public getTasksByStatus(status: string): Observable<TaskData[]> {
    // const taskList = this.getTaskList();

    // return taskList.filter((e) => e.isFinished.status === status);
    return this.http.get<TaskData[]>(`https://localhost:7099/Task/${status}`);
  }

  public getTaskById(id: string): Observable<TaskData> {
    // const tasks = this.getTaskList();

    // return tasks.find((task) => task.id === id) as TaskData;

    return this.http.get<TaskData>(`https://localhost:7099/Task/${id}`);
  }

  public createTask(task: TaskData): Observable<TaskResponse> {
    // task = {
    //   ...task,
    //   id: crypto.randomUUID(),
    //   createdAt: new Date(),
    //   priority: {
    //     ...task.priority
    //   },
    //   status: {
    //     status: 'to-do'
    //   }
    // };

    // const taskList = this.getTaskList();

    // taskList.push(task);

    // localStorage.setItem('TASKS', JSON.stringify(taskList));

    return this.http.post<TaskResponse>('https://localhost:7099/Task', task);
  }

  public editTask(task: TaskData): Observable<TaskResponse> {
    // const taskList = this.getTaskList();
    // const taskIndex = taskList.findIndex(t => t.id === task.id);

    // taskList[taskIndex] = task;

    // localStorage.setItem('TASKS', JSON.stringify(taskList));
    return this.http.put<TaskResponse>(
      `https://localhost:7099/Task/${task.id}`,
      task
    );
  }

  public deleteTask(id: string): Observable<any> {
    // const taskList = this.getTaskList();
    // const taskIndex = taskList.findIndex((t) => t.id === id);

    // taskList.splice(taskIndex, 1);

    // localStorage.setItem('TASKS', JSON.stringify(taskList));

    return this.http.delete<any>(`https://localhost:7099/Task/${id}`);
  }

  public changeStatus(task: TaskData): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `https://localhost:7099/Task/${task.id}`,
      task)
  }
}
