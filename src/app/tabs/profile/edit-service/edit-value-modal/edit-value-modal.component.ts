import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-value-modal',
  standalone: true,
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar class="bg-[#f5f5f5]" style="--background: #f5f5f5;">
        <ion-buttons slot="start">
          <ion-button (click)="cancel()" class="text-orange-500" style="--color: #f97316;">
            Cancelar
          </ion-button>
        </ion-buttons>
        <ion-title class="text-gray-900 font-semibold">Valor</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="confirm()" class="font-semibold" style="--color: #f97316;">
            Pronto
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg-[#f5f5f5]" style="--background: #f5f5f5;">
      <div class="px-4 pt-8">
        <div class="flex items-center">
          <span class="text-4xl font-bold text-gray-900">R$</span>
          <input
            type="text"
            [(ngModel)]="displayValue"
            (input)="onInput($event)"
            (focus)="onFocus()"
            class="text-4xl font-bold text-gray-900 bg-transparent border-none outline-none w-full ml-1 caret-orange-500"
            inputmode="numeric"
            #valueInput
          />
        </div>
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
export class EditValueModalComponent {
  @Input() initialValue: number = 0;

  displayValue = '0,00';

  private rawValue = 0;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.rawValue = Math.round(this.initialValue * 100);
    this.updateDisplay();
  }

  onFocus() {
    // Select all on focus for easy editing
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Remove tudo que não é número
    const numericOnly = input.value.replace(/\D/g, '');
    this.rawValue = parseInt(numericOnly, 10) || 0;
    this.updateDisplay();
  }

  updateDisplay() {
    const reais = Math.floor(this.rawValue / 100);
    const centavos = this.rawValue % 100;
    this.displayValue = `${reais.toLocaleString('pt-BR')},${centavos.toString().padStart(2, '0')}`;
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const value = this.rawValue / 100;
    this.modalCtrl.dismiss(value, 'confirm');
  }
}
