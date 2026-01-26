import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

export type FeedbackType = 'error' | 'warning' | 'success' | 'info';

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [CommonModule, IonButton],
  templateUrl: './feedback-modal.component.html',
})
export class FeedbackModalComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() type: FeedbackType = 'info';
  @Input() actionLabel = 'OK';

  @Output() action = new EventEmitter<void>();

  constructor(private modalCtrl: ModalController) {}

  get typeLabel(): string {
    return this.type;
  }

  handleAction(): void {
    this.action.emit();
    this.modalCtrl.dismiss(null, 'action');
  }
}