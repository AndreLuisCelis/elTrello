import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoggedSubscrpition: Subscription = new Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedSubscrpition.add(
      this.authService.isLogged$.subscribe(
        (isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigateByUrl('/register')
          }
        }
      )
    )
  }

  ngOnDestroy(): void{
    this.isLoggedSubscrpition.unsubscribe();
  }
}
