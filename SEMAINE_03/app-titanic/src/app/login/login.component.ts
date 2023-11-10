import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageError?: string;
  formLogin: FormGroup = this.fb.group(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }
  );

  constructor(
    private aS: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.aS.authState)
      this.router.navigate(['/search'], { queryParams: { message: 'Success' } });
  }

  ngOnInit() { }

  onSubmit(): void {
    const { email, password } = this.formLogin.value;

    this.aS.auth(email, password).subscribe(r => {
      const { message , success } : any = r ;

      console.log(message , success)

      if (success)
        this.router.navigate(['/search'], { queryParams: { message, success} });
      else {
        this.router.navigate(['/login'], { queryParams: { message, success } });
      }
    })

  }

  get email() {
    return this.formLogin.get('email');
  }
  get pclass() {
    return this.formLogin.get('password');
  }

}