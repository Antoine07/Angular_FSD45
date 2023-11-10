import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private aS: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any | boolean {

    if (this.aS.authState) return true;

    this.router.navigate(['/login'], {
      queryParams: { messageError: 'Error authentification' }
    });
  }
}
