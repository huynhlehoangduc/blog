import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginFormResponse } from '../interfaces/login-form-response';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_ENDPOINT = 'auth';
  readonly LS_TOKEN = 'token'
  readonly LS_USER = 'user'

  constructor(private readonly httpClient: HttpClient) {
  }

  login(payload: {username: string, password: string, options}, options = {}): Observable<LoginFormResponse> {
    return this.httpClient.post(`${environment.apiUrl}/${this.API_ENDPOINT}/login`, payload, options);
  }

  me(token): Observable<User> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${environment.apiUrl}/${this.API_ENDPOINT}/me`, options);
  }

  storeTokenInfo(token: Token) {
    localStorage.setItem(this.LS_TOKEN, JSON.stringify(token));
  }

  storeUserInfo(user: User) {
    localStorage.setItem(this.LS_USER, JSON.stringify(user));
  }

  getToken(): Token {
    let token = localStorage.getItem(this.LS_TOKEN);
    return token ? JSON.parse(localStorage.getItem(this.LS_TOKEN)) : null;
  }

  getUser(): User {
    let token = localStorage.getItem(this.LS_USER);
    return token ? JSON.parse(localStorage.getItem(this.LS_USER)) : null;
  }
}
