import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError?: string ;

  constructor(
    private aS: AuthService,
    private router: Router
  ) {
    // if (this.aS.authenticated())
    //   this.router.navigate(['/search'], { queryParams: { message: 'Success' } });
  }

  ngOnInit() {}

  onSubmit(form: NgForm): void {
    
   
  }

}