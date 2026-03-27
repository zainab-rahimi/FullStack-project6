import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get identifier() { return this.loginForm.get('identifier'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/articles']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Identifiants incorrects. Veuillez réessayer.';
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
