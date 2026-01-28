import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

export interface Attendance {
  id: string;
  clientName: string;
  serviceName: string;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  price: number;
}

@Component({
  selector: 'app-attendances',
  standalone: true,
  templateUrl: './attendances.page.html',
  imports: [CommonModule, IonContent],
})
export class AttendancesPage {
  readonly attendances = signal<Attendance[]>([]);

  constructor(private navCtrl: NavController) {}

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/profile');
  }
}
