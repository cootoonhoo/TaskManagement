import { Router } from '@angular/router';
import { SignUpService } from './../services/signUp.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { signUpRequest } from '../models/signUpResquest.model';
import { Injectable } from '@angular/core';
import { FormValidation } from './form-validation';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private signUpService: SignUpService, private router: Router) {}

  public signUpForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    repassword: new FormControl (null, [FormValidation.equalsTo("password"), Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public formData!: signUpRequest;
  hide = true;

  NgOnInit() {}


  private ResetUsername(): void {
    const user: signUpRequest = {
      username: '',
    };

    this.signUpForm.patchValue(user);
  }

  public submitForm(): void {
    this.formData = {
      username: this.signUpForm.getRawValue().username,
      password: this.signUpForm.getRawValue().password,
      name: this.signUpForm.getRawValue().name,
      email: this.signUpForm.getRawValue().email,
    };

    this.signUpService.signUp(this.formData).subscribe({
      next: (response) => {
        console.log("response:");
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert('Esse usuário não esta disponível, tente outro');
        this.ResetUsername();
      },
    });
  }

  get username() {
    return this.signUpForm.get('username')!;
  }

  get password() {
    return this.signUpForm.get('password')!;
  }

  get repassword() {
    return this.signUpForm.get('repassword')!;
  }

  get name() {
    return this.signUpForm.get('name')!;
  }

  get email() {
    return this.signUpForm.get('email')!;
  }
}
