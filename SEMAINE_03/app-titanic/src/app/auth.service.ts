import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Importez les modules nécessaires pour l'authentification
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState: boolean = false;
  private urlApi = 'http://localhost:3002/api'


  constructor(private router: Router, private http : HttpClient) {}

  auth(email: string, password: string) {
    return this.http.post<void>(this.urlApi + '/login' , {password, email});
  }

  logout() {

  }

  currentUserObservable() {
    return 
  }
}