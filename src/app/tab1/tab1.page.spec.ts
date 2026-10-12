import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SavedCounter } from '../models/saved-counter';
import { CounterService } from '../services/counter.service';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call counterService.add on saved', async () => {
    const counterService = TestBed.inject(CounterService);
    const addSpy = vi.spyOn(counterService, 'add').mockResolvedValue();
    const counter: SavedCounter = {
      id: '1',
      name: 'Test',
      value: 5,
      createdAt: new Date().toISOString(),
    };

    await component.onSaved(counter);

    expect(addSpy).toHaveBeenCalledWith(counter);
  });
});