import { Router } from '@angular/router';
import { SignUpService } from './../services/signUp.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { signUpRequest } from '../models/signUpResquest.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public form!:FormGroup;
  public formData!: signUpRequest;
  private signUpRequest!: SignUpService
  private router!: Router;
  hide = true;

  NgOnInit(){
    this.buildForm();
  }

  public buildForm() :void{
  this.form = new FormGroup({
    username:  new FormControl("", [Validators.required,Validators.minLength(3)]),
    password:  new FormControl("", [Validators.required, Validators.minLength(6)]),
    repassword:  new FormControl("", [Validators.required, this.MatchPassword]),
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email])
  })
  }

  public MatchPassword(){
    let password = this.form.getRawValue().password;
    let repassword = this.form.getRawValue().repassword;

    if(password !== repassword){
      return {"invalidPassword": true};
    }
    else{
      return null;
    }
  }

  private ResetUsername(): void {
    const user: signUpRequest = {
      username: ""
    }

    this.form.patchValue(user);
  }

  public submitForm(): void {
    this.formData = {
      username: this.form.getRawValue().username,
      password: this.form.getRawValue().password,
      name: this.form.getRawValue().name,
      email: this.form.getRawValue().email
    };

    this.signUpRequest.signUp(this.formData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err)
        alert("Esse usuário não esta disponível, tente outro");
        this.ResetUsername();
      }
    });

  }

  get username() { return this.form.get('username')!; };

  get password() { return this.form.get('password')!; };

  get repassword() { return this.form.get('repassword')!; };

  get name() { return this.form.get('name')!; };

  get email() { return this.form.get('email')!; };

  }


