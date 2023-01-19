import { Component } from '@angular/core';
import { LoginService } from '../public-module/services/login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor( public loginService: LoginService) {}
}
