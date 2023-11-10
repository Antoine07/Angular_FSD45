import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Importez les modules nécessaires pour l'authentification
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { environment as env } from '../environements/environement';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authState: boolean =  !!localStorage.getItem('token') ;
  public tokenName: string =  env.tokenName ;
  private urlApi = env.apiUrl
  private token?: string;

  constructor(private router: Router, private http: HttpClient) { }

  auth(email: string, password: string) {
    return this.http.post<any>(this.urlApi + '/login', { password, email }, { withCredentials: true }).pipe(
      map(response => {
        this.authState = false;

        return response
      }),
      map(response => {
        const { message, success, token } = response;
        if(success){
          this.setAuthToken(token);
          this.authState = true;
        }

        return (
          { message, success }
        )
      })
    )
  }

  logout() {
    this.clearAuthToken();
  }

  currentUserObservable() {
    return
  }

  setAuthToken(token: string) {
    localStorage.setItem(this.tokenName, token);
    this.authState = true ;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.tokenName);
  }
}