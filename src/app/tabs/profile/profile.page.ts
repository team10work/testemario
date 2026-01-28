import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Service } from '../../shared/interfaces/service';


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

  constructor(
    private router: Router,
    private navCtrl: NavController,
  ) {}

  goToBalance(): void {
    console.log('Navigating to balance page');
    this.navCtrl.navigateForward('/tabs/profile/balance');
  }

  goToEditProfile(): void {
    this.navCtrl.navigateForward('/tabs/profile/edit-profile');
  }

  goToEditService(serviceId: string): void {
    this.navCtrl.navigateForward(`/tabs/profile/edit-service/${serviceId}`);
  }

  goToServices(): void {
    this.navCtrl.navigateForward('/tabs/profile/services');
  }

  goToAttendances(): void {
    this.navCtrl.navigateForward('/tabs/profile/attendances');
  }

  goToSubscriptions(): void {
    this.navCtrl.navigateForward('/tabs/profile/subscriptions');
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
