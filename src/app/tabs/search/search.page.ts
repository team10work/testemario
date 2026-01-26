import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';

import {
  calendarOutline,
  chevronDownOutline,
  colorWandOutline,
  fitnessOutline,
  flash,
  locationOutline,
  medkitOutline,
  nutritionOutline,
  peopleOutline,
  personCircleOutline,
  searchOutline,
  star,
  walkOutline,
  bookOutline,
} from 'ionicons/icons';

import { addIcons } from 'ionicons';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.page.html',
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    IonInput,
    IonChip,
    IonLabel,
  ],
})
export class SearchPage {
  constructor() {
    addIcons({
      calendarOutline,
      chevronDownOutline,
      colorWandOutline,
      fitnessOutline,
      flash,
      locationOutline,
      medkitOutline,
      nutritionOutline,
      peopleOutline,
      personCircleOutline,
      searchOutline,
      star,
      walkOutline,
      bookOutline,
    });
  }
}
