import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginRequest } from 'src/models/loginRequest.model';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public formData!: loginRequest;
  private loginRequest!: LoginService;
  private router!: Router;
  hide = true;


  NgOnInit() {
  }



  public submitForm(): void {
    this.formData = this.loginForm.getRawValue();
    // this.loginRequest.login(this.formData).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     localStorage.setItem('USER_TOKEN', response.token);
    //     localStorage.setItem('USER', JSON.stringify(response.user));
    //     this.router.navigate([]);
    //   },
    //   error: (err) => {
    //     console.log(err)
    //     alert("Usuário ou senha incorretos, tente novamente");
    //     this.loginForm.reset();
    //   }

    // });

    console.log(this.formData);
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }
}
