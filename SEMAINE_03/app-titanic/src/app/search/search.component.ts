import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Passenger } from '../Passenger';
import { TitanicService } from '../titanic.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('graphTitanic') graphTitanic?: ElementRef;

  searchForm: FormGroup = this.fb.group(
    {
      sex: new FormControl('', [Validators.required]),
      pclass: new FormControl('', []),
      survived: new FormControl('1', [Validators.required]),
      age: new FormControl('', [Validators.min(0), Validators.max(85)]),

    }
  );

  results: Passenger[] = [];

  constructor(private fb: FormBuilder, private tS: TitanicService) {
    console.log("constructor")
  }

  ngAfterViewInit() {
    this.createChart([], []);

    console.log("after view init")
  }

  get sex() {
    return this.searchForm.get('sex');
  }
  get pclass() {
    return this.searchForm.get('pclass');
  }
  get age() { return this.searchForm.get('age'); }

  onSubmit() {
    const { sex, age, pclass, survived } = this.searchForm.value;

    this.tS.search({ sex, age, pclass, survived }).subscribe(passengers => {

      this.results = passengers;
    })

  }

  onCancel():void{
    this.results = [];
    console.log("CANCEL");
    
  }

  createChart(data: any, labels: any) {
    const ctx = this.graphTitanic?.nativeElement.getContext('2d');

    const graphTitanic = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Series A',
            data: [65, 59, 80],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Series B',
            data: [28, 48, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
