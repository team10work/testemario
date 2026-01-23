import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-email-confirmation-modal',
  templateUrl: './email-confirmation-modal.component.html',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon],
})
export class EmailConfirmationModalComponent {
  constructor(private modalCtrl: ModalController) {}

  close(): void {
    this.modalCtrl.dismiss();
  }
}
