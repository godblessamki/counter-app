import { Component, OnInit, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
} from '@ionic/angular';
import { SavedCounter } from '../../models/saved-counter';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonInput,
  ],
})
export class CounterComponent implements OnInit {
  readonly heading = input('Nové počítadlo');
  readonly initialValue = input<number>(0);
  readonly saved = output<SavedCounter>();

  counterName = '';
  count = 0;

  ngOnInit(): void {
    this.count = this.initialValue();
  }

  increment(): void {
    this.count++;
  }

  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  reset(): void {
    this.count = this.initialValue();
  }

  save(): void {
  const name = this.counterName.trim();

  if (!name) {
    return;
  }

  this.saved.emit({
    id: crypto.randomUUID(),
    name,
    value: this.count,
    createdAt: new Date().toISOString(),
  });

  this.counterName = '';
  this.count = 0;
  }
}