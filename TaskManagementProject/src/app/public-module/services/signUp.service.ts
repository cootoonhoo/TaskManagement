import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUpRequest } from '../models/signUpResquest.model';
import { signUpResponse } from '../models/signUpResponse.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  constructor(private http: HttpClient, private router: Router) { }

  public signUp(payload: signUpRequest):Observable<signUpResponse> {
    return this.http.post<signUpResponse>('https://mindnoteapi.azure-api.net/Person', payload);
  }

}
