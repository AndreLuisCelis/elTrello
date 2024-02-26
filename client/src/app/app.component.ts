import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent  implements OnInit{

  currenteUser$ = this.authService.currentUser$;

  constructor( private authService: AuthService){}
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
     next: currentUser => {
      this.authService.setCurrentUser(currentUser);
     },
     error: err => {
      this.authService.setCurrentUser(null)
      console.log(err)
    }
    })

    this.authService.getCurrentUser().subscribe( res => {
      console.log('res', res);
    })
  }
}
