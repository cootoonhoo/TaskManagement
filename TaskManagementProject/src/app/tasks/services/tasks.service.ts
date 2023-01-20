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
    return [
      { id: false, status: 'to do' },
      { id: true, status: 'done' },
    ];
  }

  private urlAPI: string = 'https://mindnoteapiwebapp.azurewebsites.net';

  public getTasks(): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(
      `${this.urlAPI}/Task`
    );
  }

  public getTasksByStatus(status: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(
      `${this.urlAPI}/Task/ByUserStatus/${status}`
    );
  }

  public getTaskById(id: string): Observable<TaskData> {
    return this.http.get<TaskData>(
      `${this.urlAPI}/Task/ByTaskId/${id}`
    );
  }

  public getTaskByUserId(id: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(
      `${this.urlAPI}/Task/ByUserId/${id}`
    );
  }

  public createTask(task: TaskData): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${this.urlAPI}/Task`,
      task
    );
  }

  public editTask(task: TaskData): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${this.urlAPI}/Task/${task.id}`,
      task
    );
  }

  public deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.urlAPI}/Task/${id}`
    );
  }

  public changeStatus(task: TaskData): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(
      `${this.urlAPI}/Task/ChangeStatus/${task.id}`,
      task
    );
  }
}
