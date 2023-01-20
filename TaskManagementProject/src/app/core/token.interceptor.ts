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
    if(request.url.includes("/login") || request.url.includes("/sign-up")) {
      return next.handle(request);
    }

    const token = localStorage.getItem("USER_TOKEN");

    if (!token) {
      alert("Usuário não autorizado");
      this.loginService.logout();
    }

    const cloneResquet = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`) });

      return next.handle(cloneResquet);
  }
}
