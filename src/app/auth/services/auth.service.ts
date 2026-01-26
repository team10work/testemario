import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../shared/interfaces/auth-response';
import { LoginRequest } from '../../shared/interfaces/login-request';
import { RegisterRequest } from '../../shared/interfaces/register-request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, payload);
  }

  sendReset(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/forgot-password`, { email });
  }
}