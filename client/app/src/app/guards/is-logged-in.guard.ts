import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return (
      this.checkIfLogged(state.url) ||
      this.router.createUrlTree(['/auth/login'])
    );
  }

  checkIfLogged(url: string): boolean {
    return localStorage.getItem('userId') !== null ? true : false;
  }
}
@Injectable({
  providedIn: 'root',
})
export class InversedAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return (
      this.checkIfNotLogged(state.url) ||
      this.router.createUrlTree(['/'])
    );
  }

  checkIfNotLogged(url: string): boolean {
    return localStorage.getItem('userId') === null ? true : false;
  }
}
