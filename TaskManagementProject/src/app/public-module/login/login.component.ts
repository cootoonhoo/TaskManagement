import { Router } from '@angular/router';
import { loginRequest } from '../models/loginRequest.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  LoginFail: boolean = false;
  LoginSucess: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public formData!: loginRequest;
  hide = true;

  NgOnInit() {}

  public submitForm(): void {
    this.formData = this.loginForm.getRawValue();
    this.loginService.login(this.formData).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('USER_TOKEN', res.token);
        localStorage.setItem('USER_ID', res.id);
        this.LoginSucess = true;
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.log(err);
        this.LoginFail = true;
        this.loginForm.reset();
      },
    });
    this.LoginFail = false;
    this.LoginSucess = false;
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
