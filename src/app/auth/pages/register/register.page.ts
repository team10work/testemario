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
} from '@ionic/angular/standalone';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FeedbackModalService } from '../../../shared/components/feedback-modal/feedback-modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
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
  ],
})
export class RegisterPage {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private feedbackModal: FeedbackModalService,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.matchPasswords },
    );
  }

  private matchPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  submit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    const { name, email, password } = this.form.value;

    this.authService
      .register({ name, email, password })
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.form.reset();
          this.feedbackModal
            .present({
              title: 'Conta criada com sucesso',
              message: 'Agora é só entrar com seu e-mail e senha.',
              type: 'success',
              actionLabel: 'Ir para login',
            })
            .then((modal) => modal.onDidDismiss().then(() => this.router.navigateByUrl('/auth/login')));
        },
        error: (err) => {
          this.form.setErrors({ register: true });
          const backendMessage = Array.isArray(err?.error?.message)
            ? err.error.message.join(' ')
            : err?.error?.message || 'Não foi possível cadastrar. Tente novamente.';

          this.feedbackModal.present({
            title: 'Erro',
            message: backendMessage,
            actionLabel: 'Entendi',
          });
        },
      });
  }
}