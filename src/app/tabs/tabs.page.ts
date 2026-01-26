import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonTabs,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  calendarOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { SearchPage } from './search/search.page';
import { SchedulePage } from './schedule/schedule.page';
import { ProfilePage } from './profile/profile.page';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  imports: [
    CommonModule,
    IonTabs,
    IonTab,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    SearchPage,
    SchedulePage,
    ProfilePage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsPage implements AfterViewInit {
  @ViewChild('tabs', { static: true }) tabs?: IonTabs;
  initialTab: 'search' | 'schedule' | 'profile' = 'search';

  constructor(private route: ActivatedRoute) {
    addIcons({ searchOutline, calendarOutline, personCircleOutline });

    this.route.paramMap.subscribe(params => {
      const tab = (params.get('tabId') as 'search' | 'schedule' | 'profile') ?? 'search';
      this.initialTab = tab;
      // Defer to ensure IonTabs is ready before selecting
      setTimeout(() => this.tabs?.select(tab));
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.tabs?.select(this.initialTab));
  }

  goTo(tab: 'search' | 'schedule' | 'profile'): void {
    this.tabs?.select(tab);
  }
}
