import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  scheduleType: string;
  duration: string;
  type: 'remote' | 'presential';
  price: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.page.html',
  imports: [CommonModule, IonContent],
})
export class ServicesPage {
  readonly services = signal<ServiceItem[]>([
    {
      id: '1',
      name: 'Teste',
      category: 'Massoterapia',
      scheduleType: 'Agendamento único',
      duration: '1 hora',
      type: 'remote',
      price: 20,
    },
  ]);

  constructor(private navCtrl: NavController) {}

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  addService(): void {
    console.log('Add new service');
  }

  openServiceOptions(service: ServiceItem, event: Event): void {
    event.stopPropagation();
    console.log('Open options for service:', service.id);
  }

  goToEditService(serviceId: string): void {
    this.navCtrl.navigateForward(`/tabs/profile/edit-service/${serviceId}`);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
