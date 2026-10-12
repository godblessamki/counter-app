import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  AlertController,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular';
import { CounterService } from '../services/counter.service';

export type SortOption = 'newest' | 'name-asc' | 'value-desc' | 'value-asc';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    DatePipe,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab2Page implements OnInit {
  readonly counterService = inject(CounterService);
  private readonly alertController = inject(AlertController);
  private readonly toastController = inject(ToastController);

  readonly searchQuery = signal('');
  readonly sortBy = signal<SortOption>('newest');

  readonly totalValue = computed(() =>
    this.counterService.counters().reduce((sum, counter) => sum + counter.value, 0),
  );

  readonly displayedCounters = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    let items = this.counterService.counters();

    if (query) {
      items = items.filter((counter) =>
        counter.name.toLowerCase().includes(query),
      );
    }

    const sorted = [...items];
    switch (this.sortBy()) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'cs'));
      case 'value-desc':
        return sorted.sort((a, b) => b.value - a.value);
      case 'value-asc':
        return sorted.sort((a, b) => a.value - b.value);
      case 'newest':
      default:
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }
  });

  async ngOnInit(): Promise<void> {
    await this.counterService.initialize();
  }

  onSearchChange(value: string | null | undefined): void {
    this.searchQuery.set(value ?? '');
  }

  onSortChange(value: SortOption): void {
    this.sortBy.set(value);
  }

  async remove(id: string): Promise<void> {
    await this.counterService.remove(id);
    const toast = await this.toastController.create({
      message: 'Záznam byl odstraněn.',
      duration: 2000,
      color: 'medium',
      position: 'bottom',
    });
    await toast.present();
  }

  async confirmClear(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Vymazat celou historii?',
      message:
        'Opravdu chcete odstranit všechny uložené záznamy? Tato akce je nevratná.',
      buttons: [
        {
          text: 'Zrušit',
          role: 'cancel',
        },
        {
          text: 'Vymazat',
          role: 'destructive',
          handler: async () => {
            await this.counterService.clear();
            const toast = await this.toastController.create({
              message: 'Historie byla vymazána.',
              duration: 2000,
              color: 'medium',
              position: 'bottom',
            });
            await toast.present();
          },
        },
      ],
    });

    await alert.present();
  }
}