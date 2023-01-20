import { StatusData } from './../models/status-data.model';
import { PriorityData } from './../models/priority-data.model';
import { Injectable } from '@angular/core';
import { TaskData } from '../models/task-data.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateTaskData } from '../models/create-task-data.model';
import { UpdateTaskData } from '../models/update-task-data.model';

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

  private urlAPI: string = 'https://mindnoteapiwebapp.azurewebsites.net/Task';

  public getTasksByStatus(status: boolean, userId: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(
      `${this.urlAPI}/ByUserStatus/`, {
        params: {
          userId: userId,
          isFinished: status
        }
      }
    );
  }

  public getTaskById(taskId: string): Observable<TaskData> {
    return this.http.get<TaskData>(
      `${this.urlAPI}/ByTaskId`, {
        params: {
          taskId: taskId
        }
      }
    );
  }

  public getTasksByUserId(userId: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(
      `${this.urlAPI}/ByUserId/`, {
        params: {
          userId: userId
        }
      }
    );
  }

  public createTask(task: CreateTaskData, userId: string): Observable<any> {
    return this.http.post<any>(
      `${this.urlAPI}`,
      task, {
        params: {
          userId: userId
        }
      }
    );
  }

  public editTask(task: UpdateTaskData, taskId: string): Observable<any> {
    return this.http.put<any>(
      `${this.urlAPI}/`,
      task, {
        params: {
          taskId: taskId
        }
      }
    );
  }

  public deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.urlAPI}`, {
        params: {
          taskId: taskId
        }
      }
    );
  }

  public changeStatus(taskId: string): Observable<any> {
    return this.http.put<any>(
      `${this.urlAPI}/ChangeStatus`, {
        params: {
          taskId: taskId
        }
      }
    );
  }
}
