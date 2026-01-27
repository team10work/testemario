import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  chevronForwardOutline,
  trashOutline,
} from 'ionicons/icons';

type FormState = {
  title: string;
  date: string;
  start: string;
  end: string;
  endDate: string;
  description: string;
};

type Activity = FormState & { id: string };

interface CalendarCell {
  date: Date;
  iso: string;
  inMonth: boolean;
  isToday: boolean;
}

@Component({
  standalone: true,
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonIcon,
    IonModal,
    IonTitle,
    IonToolbar,
  ],
})
export class SchedulePage {
  readonly weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  readonly today = new Date();

  readonly currentYear = signal(this.today.getFullYear());
  readonly currentMonth = signal(this.today.getMonth());

  readonly modalOpen = signal(false);
  readonly editing = signal<Activity | null>(null);
  readonly form = signal<FormState>(this.buildBlankForm(this.today));
  readonly activePicker = signal<'startDate' | 'startTime' | 'endDate' | 'endTime' | null>(null);
  readonly activities = signal<Activity[]>([]);

  readonly monthLabel = computed(() =>
    new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
      new Date(this.currentYear(), this.currentMonth(), 1)
    )
  );

  readonly calendar = computed(() =>
    this.buildCalendar(this.currentYear(), this.currentMonth())
  );

  constructor() {
    addIcons({ addOutline, chevronForwardOutline, trashOutline });
  }

  prevMonth(): void {
    const next = new Date(this.currentYear(), this.currentMonth() - 1, 1);
    this.currentYear.set(next.getFullYear());
    this.currentMonth.set(next.getMonth());
  }

  nextMonth(): void {
    const next = new Date(this.currentYear(), this.currentMonth() + 1, 1);
    this.currentYear.set(next.getFullYear());
    this.currentMonth.set(next.getMonth());
  }

  goToday(): void {
    const today = new Date();
    this.currentYear.set(today.getFullYear());
    this.currentMonth.set(today.getMonth());
  }

  openCreate(date?: Date): void {
    const target = date ?? new Date(this.currentYear(), this.currentMonth(), 1);
    this.editing.set(null);
    this.form.set(this.buildBlankForm(target));
    this.modalOpen.set(true);
  }

  openEdit(activity: Activity): void {
    this.editing.set(activity);
    this.form.set({
      title: activity.title,
      date: activity.date,
      start: activity.start,
      end: activity.end,
      endDate: activity.endDate,
      description: activity.description,
    });
    this.modalOpen.set(true);
  }

  openPicker(type: 'startDate' | 'startTime' | 'endDate' | 'endTime'): void {
    this.activePicker.set(type);
  }

  closePicker(): void {
    this.activePicker.set(null);
  }

  confirmPicker(): void {
    this.activePicker.set(null);
  }

  getPickerPresentation(): 'date' | 'time' {
    const type = this.activePicker();
    return type === 'startTime' || type === 'endTime' ? 'time' : 'date';
  }

  getPickerValue(): string {
    const f = this.form();
    const type = this.activePicker();

    switch (type) {
      case 'startDate':
        return f.date || new Date().toISOString().split('T')[0];
      case 'endDate':
        return f.endDate || new Date().toISOString().split('T')[0];
      case 'startTime':
        return `2026-01-01T${f.start || '10:00'}:00`;
      case 'endTime':
        return `2026-01-01T${f.end || '11:00'}:00`;
      default:
        return new Date().toISOString();
    }
  }

  onPickerChange(event: CustomEvent): void {
    const value = (event.detail as { value?: string | null }).value;
    if (!value) return;

    const type = this.activePicker();
    if (!type) return;

    if (type === 'startDate') {
      this.updateForm('date', value.slice(0, 10));
    } else if (type === 'endDate') {
      this.updateForm('endDate', value.slice(0, 10));
    } else if (type === 'startTime') {
      const timeStr = value.includes('T') ? value.split('T')[1].slice(0, 5) : value;
      this.updateForm('start', timeStr);
    } else if (type === 'endTime') {
      const timeStr = value.includes('T') ? value.split('T')[1].slice(0, 5) : value;
      this.updateForm('end', timeStr);
    }
  }

  formatDateDisplay(isoDate: string): string {
    if (!isoDate) return 'Selecionar';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  }

  formatTimeDisplay(time: string): string {
    return time || 'Selecionar';
  }

  updateForm<K extends keyof FormState>(key: K, value: FormState[K]): void {
    this.form.update((current) => ({ ...current, [key]: value }));
  }

  saveActivity(): void {
    const form = this.form();
    const title = form.title.trim();

    if (!title) return;

    const payload: Activity = {
      id: this.editing()?.id ?? this.newId(),
      title,
      date: form.date,
      start: form.start,
      end: form.end,
      endDate: form.endDate,
      description: form.description,
    };

    if (this.editing()) {
      this.activities.update((list) =>
        list.map((item) => (item.id === payload.id ? payload : item))
      );
    } else {
      this.activities.update((list) => [...list, payload]);
    }

    this.modalOpen.set(false);
  }

  deleteActivity(): void {
    const editing = this.editing();
    if (!editing) return;

    this.activities.update((list) =>
      list.filter((item) => item.id !== editing.id)
    );

    this.modalOpen.set(false);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  activitiesForDate(iso: string): Activity[] {
    return this.activities().filter((item) => item.date === iso);
  }

  formatDate(isoDate: string): string {
    if (!isoDate) return '';
    const date = new Date(isoDate + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time;
  }

  getTotalEvents(): number {
    return this.activities().length;
  }

  getWeekEvents(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.activities().filter((a) => {
      const d = new Date(a.date);
      d.setHours(0, 0, 0, 0);
      return d >= today && d <= weekFromNow;
    }).length;
  }

  getUpcomingEvents(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.activities().filter((a) => {
      const d = new Date(a.date);
      d.setHours(0, 0, 0, 0);
      return d > today;
    }).length;
  }

  getCompletedEvents(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.activities().filter((a) => {
      const d = new Date(a.date);
      d.setHours(0, 0, 0, 0);
      return d < today;
    }).length;
  }

  private buildCalendar(year: number, month: number): CalendarCell[][] {
    const firstOfMonth = new Date(year, month, 1);
    const start = new Date(firstOfMonth);
    start.setDate(start.getDate() - start.getDay());

    const weeks: CalendarCell[][] = [];
    const cursor = new Date(start);

    for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
      const week: CalendarCell[] = [];

      for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
        const date = new Date(cursor);
        week.push({
          date,
          iso: this.toDateInput(date),
          inMonth: date.getMonth() === month,
          isToday: this.isSameDate(date, this.today),
        });
        cursor.setDate(cursor.getDate() + 1);
      }

      weeks.push(week);
    }

    return weeks;
  }

  private buildBlankForm(date: Date): FormState {
    return {
      title: '',
      date: this.toDateInput(date),
      start: '09:00',
      end: '10:00',
      endDate: this.toDateInput(date),
      description: '',
    };
  }

  private toDateInput(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private isSameDate(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private newId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as Crypto).randomUUID();
    }

    return Math.random().toString(36).slice(2);
  }
}