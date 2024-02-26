import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }
  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(map(isLogged => {
      if(isLogged){
        return isLogged
      }
      this.router.navigateByUrl('/')
      return isLogged
    }))
  }
}
