import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedbackModalComponent, FeedbackType } from './feedback-modal.component';

export interface FeedbackModalOptions {
  title: string;
  message: string;
  type?: FeedbackType;
  actionLabel?: string;
  backdropDismiss?: boolean;
}

@Injectable({ providedIn: 'root' })
export class FeedbackModalService {
  constructor(private readonly modalController: ModalController) {}

  async present(options: FeedbackModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({
      component: FeedbackModalComponent,
      cssClass: 'feedback-modal',
      breakpoints: [0.25],
      initialBreakpoint: 0.25,
      handle: false,
      backdropDismiss: options.backdropDismiss ?? true,
      componentProps: {
        title: options.title,
        message: options.message,
        type: options.type ?? 'info',
        actionLabel: options.actionLabel ?? 'OK',
      },
    });

    await modal.present();
    return modal;
  }
}