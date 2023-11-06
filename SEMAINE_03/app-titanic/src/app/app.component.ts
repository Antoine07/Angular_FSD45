import { Component, OnInit } from '@angular/core';
import { TitanicService } from './titanic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'app-titanic';

  // on récupère le service 
  constructor(private titanicS : TitanicService){}

  ngOnInit() {

    // test pour voir si on arrive à tout récupéer dans l'application Front
    // dans le service on va chercher la méthode nous permettant de récupérer les données
    // subscribre 
    this.titanicS.getPassengers().subscribe(console.log)
  }
}
