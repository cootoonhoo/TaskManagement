import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest } from '../models/loginRequest.model';
import { loginResponse } from '../models/loginResponse.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(payload: loginRequest):Observable<loginResponse> {
    return this.http.post<loginResponse>('', payload);
  }

  public logout(): void {
    localStorage.removeItem('USER_TOKEN');
    localStorage.removeItem('USER');
    this.router.navigate(['']);
  }

}
