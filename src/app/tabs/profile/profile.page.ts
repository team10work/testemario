import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

interface Service {
  id: string;
  name: string;
  type: 'remote' | 'presential';
  price: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  imports: [CommonModule, IonContent],
})
export class ProfilePage {
  readonly showBalance = signal(true);
  readonly balance = signal(0);
  readonly pendingBalance = signal(0);
  
  readonly profile = signal({
    name: 'Mário Coxe',
    profession: 'Software Developer and Devops',
  });

  readonly services = signal<Service[]>([
    { id: '1', name: 'Teste', type: 'remote', price: 20 },
  ]);

  readonly rating = signal<number | null>(null);
  readonly reviewCount = signal(0);

  constructor() {}

  toggleBalance(): void {
    this.showBalance.update((v) => !v);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
