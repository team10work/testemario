import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-text-modal',
  standalone: true,
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar class="bg-[#f5f5f5]" style="--background: #f5f5f5;">
        <ion-buttons slot="start">
          <ion-button (click)="cancel()" style="--color: #f97316;">
            Cancelar
          </ion-button>
        </ion-buttons>
        <ion-title class="text-gray-900 font-semibold">{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="confirm()" class="font-semibold" style="--color: #f97316;">
            Pronto
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg-[#f5f5f5]" style="--background: #f5f5f5;">
      <div class="px-4 pt-8">
        @if (inputType === 'textarea') {
          <textarea
            [(ngModel)]="value"
            [placeholder]="placeholder"
            rows="6"
            class="w-full text-xl text-gray-900 bg-transparent border-none outline-none resize-none caret-orange-500"
          ></textarea>
        } @else if (inputType === 'number') {
          <input
            type="text"
            [(ngModel)]="value"
            [placeholder]="placeholder"
            inputmode="numeric"
            class="text-4xl font-bold text-gray-900 bg-transparent border-none outline-none w-full caret-orange-500"
          />
        } @else {
          <input
            type="text"
            [(ngModel)]="value"
            [placeholder]="placeholder"
            class="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none w-full caret-orange-500"
          />
        }
      </div>
    </ion-content>
  `,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
  ],
})
export class EditTextModalComponent {
  @Input() title: string = '';
  @Input() initialValue: string = '';
  @Input() placeholder: string = '';
  @Input() inputType: 'text' | 'number' | 'textarea' = 'text';

  value = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.value = this.initialValue;
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.value, 'confirm');
  }
}
