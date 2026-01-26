import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/angular/standalone';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FeedbackModalService } from '../../../shared/components/feedback-modal/feedback-modal.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonText,
  ],
})
export class ForgotPasswordPage {
  form: FormGroup;
  isSubmitting = false;
  sent = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private feedbackModal: FeedbackModalService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    this.authService
      .sendReset(this.form.value.email)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.sent = true;
          this.feedbackModal.present({
            title: 'E-mail enviado',
            message: 'Verifique sua caixa de entrada para redefinir a senha.',
            type: 'info',
            actionLabel: 'Ok',
          });
        },
        error: () => {
          this.form.setErrors({ reset: true });
          this.feedbackModal.present({
            title: 'Não foi possível enviar',
            message: 'Tente novamente em alguns instantes.',
            type: 'error',
            actionLabel: 'Entendi',
          });
        },
      });
  }

  goLogin(): void {
    this.router.navigateByUrl('/auth/login');
  }
}