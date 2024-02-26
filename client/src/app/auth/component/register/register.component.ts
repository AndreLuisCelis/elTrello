import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  erro: string | null = null;

  form = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.form.value).subscribe({
      next:currentUser => {
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        this.form.reset();
        this.erro = null;
        this.router.navigateByUrl('/')
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this.erro = err.error.length? err?.error?.join(', '): null;
      }
    })
  }

  ngOnInit(): void {
  }

}
