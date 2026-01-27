import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Transaction } from 'src/app/shared/interfaces/transaction';

@Component({
  selector: 'app-balance',
  standalone: true,
  templateUrl: './balance.page.html',
  imports: [CommonModule, IonContent],
})
export class BalancePage {
  readonly showBalance = signal(true);
  readonly balance = signal(0);
  readonly pendingBalance = signal(0);
  readonly transactions = signal<Transaction[]>([]);

  constructor(private navCtrl: NavController) {}

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/profile');
  }

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
