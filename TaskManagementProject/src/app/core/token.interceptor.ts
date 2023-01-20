import { LoginService } from './../public-module/services/login.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes("/token")) {
      return next.handle(request);
    }

    let token = localStorage.getItem("USER_TOKEN");

    if (!token) {
      token = "";
    }

    const cloneResquet = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`) });

      return next.handle(cloneResquet);
  }
}
