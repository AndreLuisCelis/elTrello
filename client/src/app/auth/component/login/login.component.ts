import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string | null = null;

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.form.value).subscribe({
      next: currentUser => {
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        this.form.reset();
        this.errorMessage = null;
        this.router.navigateByUrl('/boards')
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this.errorMessage =  err?.error?.emailOrPassword;
      }
    })
  }

  ngOnInit(): void {
  }


}
