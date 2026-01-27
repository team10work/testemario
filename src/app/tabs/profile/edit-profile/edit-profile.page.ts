import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.page.html',
  imports: [CommonModule, IonContent],
})
export class EditProfilePage {
  readonly profile = signal({
    username: '@mariocoxedev',
    name: 'Mário Coxe',
    profession: 'Software Developer and Devops',
    photo: '',
    bio: 'Um massoterapeuta apenas para você mulher que quer algo a + para um dia mais leve e suave limitado a 1 por dia , tudo que eh bom não está disponível para todos',
    tags: ['#Massagem adulta', '#Tanticra para mulheres', '#Cuidado pessoal'],
  });

  readonly reviews = signal<any[]>([]);
  readonly education = signal<any[]>([]);

  constructor(private navCtrl: NavController) {}

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  editProfile(): void {
    console.log('Edit profileee');
  }
}
