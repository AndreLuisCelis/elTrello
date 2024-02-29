import { CurrentUser } from './../types/currentUser.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../types/registerRequest';
import { LoginRequest } from '../types/loginRequest';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = new BehaviorSubject<CurrentUser | null | undefined>(
    undefined
  )

  isLogged$ = this.currentUser$.pipe(
    filter( currentUser => currentUser !== undefined),
    map(currentUser => Boolean(currentUser))
  )

  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<CurrentUser> {
    const url = environment.apiUrl + '/user';
    return this.http.get<CurrentUser>(url);
  }

  register( registerRequest: RegisterRequest): Observable<CurrentUser>{
    return this.http.post<CurrentUser>(this.apiUrl+'/users', registerRequest);
  }

  login( loginRequest: LoginRequest): Observable<CurrentUser>{
    return this.http.post<CurrentUser>(this.apiUrl+'/users/login', loginRequest);
  }

  setToken(currentUser: CurrentUser): void {
    localStorage.setItem('token', currentUser.token);
  }

  setCurrentUser( currentUser: CurrentUser | undefined | null):void {
    this.currentUser$.next(currentUser);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
  }


}
