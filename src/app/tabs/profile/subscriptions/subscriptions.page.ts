import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

export interface Subscription {
  id: string;
  clientName: string;
  serviceName: string;
  startDate: Date;
  status: 'pending' | 'active' | 'cancelled';
  price: number;
}

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  templateUrl: './subscriptions.page.html',
  imports: [CommonModule, IonContent],
})
export class SubscriptionsPage {
  readonly activeTab = signal<'pending' | 'active' | 'cancelled'>('pending');

  readonly subscriptions = signal<Subscription[]>([]);

  constructor(private navCtrl: NavController) {}

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  setTab(tab: 'pending' | 'active' | 'cancelled'): void {
    this.activeTab.set(tab);
  }

  get filteredSubscriptions(): Subscription[] {
    return this.subscriptions().filter((s) => s.status === this.activeTab());
  }

  getEmptyMessage(): string {
    switch (this.activeTab()) {
      case 'pending':
        return 'Tudo tranquilo! Não há solicitações de assinaturas aguardando sua ação.';
      case 'active':
        return 'Você não possui assinaturas ativas no momento.';
      case 'cancelled':
        return 'Nenhuma assinatura foi cancelada.';
    }
  }
}
