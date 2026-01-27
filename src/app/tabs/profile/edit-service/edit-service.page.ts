import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonToggle } from '@ionic/angular/standalone';
import { NavController, ActionSheetController, ModalController } from '@ionic/angular';
import { EditValueModalComponent } from './edit-value-modal/edit-value-modal.component';
import { EditTextModalComponent } from './edit-text-modal/edit-text-modal.component';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  templateUrl: './edit-service.page.html',
  imports: [CommonModule, IonContent, IonToggle],
})
export class EditServicePage {
  readonly service = signal({
    name: 'Teste',
    type: 'Atendimento (único)',
    areas: 1,
    offers: 3,
    description: 'Só vem mm para melh...',
    attendanceType: 'Remoto',
    duration: '1 hora',
    workHours: '',
    observations: '',
    advanceTime: '1 hora',
    price: 0,
  });

  readonly availableForSale = signal(true);

  // Opções para os campos de seleção
  readonly typeOptions = ['Atendimento (único)', 'Pacote', 'Mentoria', 'Consultoria'];
  readonly attendanceOptions = ['Remoto', 'Presencial', 'Híbrido'];
  readonly durationOptions = ['30 minutos', '45 minutos', '1 hora', '1h30', '2 horas', '3 horas'];
  readonly advanceOptions = ['30 minutos', '1 hora', '2 horas', '6 horas', '12 horas', '24 horas', '48 horas'];

  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {}

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  save(): void {
    console.log('Saving service:', this.service());
    this.goBack();
  }

  toggleAvailableForSale(): void {
    this.availableForSale.update((v) => !v);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // ===== EDIT METHODS =====

  async editName(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTextModalComponent,
      componentProps: {
        title: 'Nome do serviço',
        initialValue: this.service().name,
        placeholder: 'Digite o nome do serviço',
        inputType: 'text',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data?.trim()) {
      this.service.update((s) => ({ ...s, name: data.trim() }));
    }
  }

  async editType(): Promise<void> {
    const buttons = this.typeOptions.map((option) => ({
      text: option,
      handler: () => {
        this.service.update((s) => ({ ...s, type: option }));
      },
    }));
    buttons.push({ text: 'Cancelar', role: 'cancel' } as any);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tipo de serviço',
      buttons,
    });
    await actionSheet.present();
  }

  async editAreas(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTextModalComponent,
      componentProps: {
        title: 'Áreas de atuação',
        initialValue: this.service().areas.toString(),
        placeholder: 'Número de áreas',
        inputType: 'number',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      const areas = parseInt(data, 10);
      if (!isNaN(areas) && areas > 0) {
        this.service.update((s) => ({ ...s, areas }));
      }
    }
  }

  async editOffers(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTextModalComponent,
      componentProps: {
        title: 'O que oferece?',
        initialValue: this.service().offers.toString(),
        placeholder: 'Número de itens',
        inputType: 'number',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      const offers = parseInt(data, 10);
      if (!isNaN(offers) && offers > 0) {
        this.service.update((s) => ({ ...s, offers }));
      }
    }
  }

  async editDescription(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTextModalComponent,
      componentProps: {
        title: 'Descrição',
        initialValue: this.service().description,
        placeholder: 'Descreva seu serviço...',
        inputType: 'textarea',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data?.trim()) {
      this.service.update((s) => ({ ...s, description: data.trim() }));
    }
  }

  async editAttendanceType(): Promise<void> {
    const buttons = this.attendanceOptions.map((option) => ({
      text: option,
      handler: () => {
        this.service.update((s) => ({ ...s, attendanceType: option }));
      },
    }));
    buttons.push({ text: 'Cancelar', role: 'cancel' } as any);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tipo de atendimento',
      buttons,
    });
    await actionSheet.present();
  }

  async editDuration(): Promise<void> {
    const buttons = this.durationOptions.map((option) => ({
      text: option,
      handler: () => {
        this.service.update((s) => ({ ...s, duration: option }));
      },
    }));
    buttons.push({ text: 'Cancelar', role: 'cancel' } as any);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Duração do serviço',
      buttons,
    });
    await actionSheet.present();
  }

  async editWorkHours(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTextModalComponent,
      componentProps: {
        title: 'Horários de trabalho',
        initialValue: this.service().workHours,
        placeholder: 'Ex: Seg-Sex 9h às 18h',
        inputType: 'text',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.service.update((s) => ({ ...s, workHours: data?.trim() || '' }));
    }
  }

  async editObservations(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditTextModalComponent,
      componentProps: {
        title: 'Observações',
        initialValue: this.service().observations,
        placeholder: 'Adicione observações sobre o serviço...',
        inputType: 'textarea',
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.service.update((s) => ({ ...s, observations: data?.trim() || '' }));
    }
  }

  async editAdvanceTime(): Promise<void> {
    const buttons = this.advanceOptions.map((option) => ({
      text: option,
      handler: () => {
        this.service.update((s) => ({ ...s, advanceTime: option }));
      },
    }));
    buttons.push({ text: 'Cancelar', role: 'cancel' } as any);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tempo de antecedência',
      buttons,
    });
    await actionSheet.present();
  }

  async editPrice(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: EditValueModalComponent,
      componentProps: {
        initialValue: this.service().price,
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data !== null && data !== undefined) {
      this.service.update((s) => ({ ...s, price: data }));
    }
  }
}
