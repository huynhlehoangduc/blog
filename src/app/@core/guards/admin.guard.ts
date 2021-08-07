import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.authService.getToken()?.accessToken;

    if (!token) {
      void this.router.navigate(['/admin-login']);
      return false;
    }

    return this.authService
    .me(token)
    .pipe(
      tap(_ => console.log(_)),
      map(_ => true),
      catchError(_ => {
        void this.router.navigate(['/admin-login']);
        return of(false);
      })
    );
  }

}
