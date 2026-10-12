import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonTitle,
    IonToolbar,
  ],
})
export class Tab1Page {
  counterName = '';
  count = 0;
  step = 1;

  increment(amount: number = this.step): void {
    const delta = Number(amount) > 0 ? Number(amount) : 1;
    this.count += delta;
  }

  decrement(amount: number = this.step): void {
    const delta = Number(amount) > 0 ? Number(amount) : 1;
    this.count = Math.max(0, this.count - delta);
  }

  reset(): void {
    this.count = 0;
  }

  resetAll(): void {
    this.count = 0;
    this.counterName = '';
  }
}