import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FeedbackModalService } from '../../../shared/components/feedback-modal/feedback-modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
  ],
})
export class LoginPage {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private feedbackModal: FeedbackModalService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    this.authService
      .login(this.form.value)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => this.navCtrl.navigateRoot('/tabs/search'),
        error: (err) => {
          this.form.setErrors({ auth: true });
          const backendMessage = Array.isArray(err?.error?.message)
            ? err.error.message.join(' ')
            : err?.error?.message || 'Não foi possível entrar. Tente novamente.';

          this.feedbackModal.present({
            title: 'Erro',
            message: backendMessage,
            actionLabel: 'Entendi',
          });
        },
      });
  }

  goForgotPassword(): void {
    this.router.navigateByUrl('/auth/forgot-password');
  }

  goRegister(): void {
    this.router.navigateByUrl('/auth/register');
  }
}