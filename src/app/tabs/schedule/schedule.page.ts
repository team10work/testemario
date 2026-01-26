import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.page.html',
  imports: [CommonModule, IonContent],
})
export class SchedulePage {
  constructor() {}
}
