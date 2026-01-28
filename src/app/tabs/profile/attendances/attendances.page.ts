import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Attendance } from 'src/app/shared/interfaces/attendance';

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
