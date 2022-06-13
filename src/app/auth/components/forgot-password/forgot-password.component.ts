import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  clicked = false;
  incorrect = false;
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  forgotPassword(event: Event) {
    event.preventDefault();
    this.clicked = true;

    if (this.form.valid) {
      const value = this.form.value;
      this.authService
        .resetPassword(value.email)
        .then(() => {
          window.alert('Correo enviado, revisa tu bandeja de entrada.');
          this.router.navigate(['/auth/login']);
        })
        .catch((e) => {
          this.message = 'No se pudo enviar el correo, intenta de nuevo';
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.form.controls;
  }
}
