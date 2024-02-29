import { CurrentUser } from './../../auth/types/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../types/board';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  constructor( private http: HttpClient) {
   }

  getBoards(): Observable<Board[]> {
    const url = environment.apiUrl + '/boards';
    return this.http.get<Board[]>(url)
  }

  createBoard(title: string): Observable<Board> {
    const url = environment.apiUrl + '/boards';
    return this.http.post<Board>(url, { title });
  }
}
