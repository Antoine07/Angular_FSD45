import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Passenger, hydratePassengers, Search } from './Passenger';

// On précisera le type de la requête à effectuer
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TitanicService {
  // l'adresse de ton API titanic voir npm run dev et les routes de l'API
  private urlApi = 'http://localhost:3002/api'

  // on récupère HttpClient qui est un module permettant de faire des requêtes HTTP (comme AJAX ou fetcj )
  constructor(private http: HttpClient) { }

  /**
   * On utilise HttpClient 
   * 
   * @returns les données passengers filtrées de type Observable<Passenger[]> 
   */
  getPassengers(): Observable<Passenger[]> {

    return this.http.get<Passenger[]>(this.urlApi + '/passengers', httpOptions).pipe(map(hydratePassengers));
  }

  search({ sex , age, plcass  } : Search ): Observable<Passenger[]> {

    return this.http.get<Passenger[]>(`${this.urlApi}/passengers/Sex/${sex}?age=${age}&plcass=${plcass}`, httpOptions).pipe(map(hydratePassengers));
  }

}
