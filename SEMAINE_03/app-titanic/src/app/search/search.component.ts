import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Passenger } from '../Passenger';
import { TitanicService } from '../titanic.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = this.fb.group(
    {
      sex: new FormControl('', [Validators.required]),
      pclass: new FormControl('', []),
      survived: new FormControl('1', [Validators.required]),
      age: new FormControl('', [ Validators.min(0), Validators.max(85)]),

    }
  );

  results? : Observable<Passenger[]> ;

  constructor(private fb: FormBuilder, private tS : TitanicService) {}

  ngOnInit() {
  }

  get sex() {
    return this.searchForm.get('sex');
  }
  get pclass() {
    return this.searchForm.get('pclass');
  }
  get age() { return this.searchForm.get('age'); }

  onSubmit() {
    console.log('Formulaire soumis avec succès!', this.searchForm.value);

    const { sex, age, pclass, survived } = this.searchForm.value ;

    this.results  = this.tS.search({ sex, age, pclass, survived }); // async dans la vue 
   
  }
}
