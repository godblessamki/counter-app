import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CounterService } from '../services/counter.service';
import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(async () => {
    const counterService = TestBed.inject(CounterService);
    vi.spyOn(counterService, 'initialize').mockResolvedValue();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalValue correctly', () => {
    const counterService = TestBed.inject(CounterService);
    vi.spyOn(counterService, 'counters').mockReturnValue([
      { id: '1', name: 'A', value: 10, createdAt: '2026-09-17T08:00:00.000Z' },
      { id: '2', name: 'B', value: 25, createdAt: '2026-09-17T09:00:00.000Z' },
    ]);

    expect(component.totalValue()).toBe(35);
  });

  it('should filter displayedCounters by searchQuery', () => {
    const counterService = TestBed.inject(CounterService);
    vi.spyOn(counterService, 'counters').mockReturnValue([
      { id: '1', name: 'Jablka', value: 5, createdAt: '2026-09-17T08:00:00.000Z' },
      { id: '2', name: 'Hrušky', value: 3, createdAt: '2026-09-17T09:00:00.000Z' },
    ]);

    component.onSearchChange('jabl');
    expect(component.displayedCounters().length).toBe(1);
    expect(component.displayedCounters()[0].name).toBe('Jablka');
  });

  it('should sort displayedCounters by name and value', () => {
    const counterService = TestBed.inject(CounterService);
    vi.spyOn(counterService, 'counters').mockReturnValue([
      { id: '1', name: 'Banan', value: 10, createdAt: '2026-09-17T08:00:00.000Z' },
      { id: '2', name: 'Ananas', value: 20, createdAt: '2026-09-17T09:00:00.000Z' },
    ]);

    component.onSortChange('name-asc');
    expect(component.displayedCounters()[0].name).toBe('Ananas');

    component.onSortChange('value-desc');
    expect(component.displayedCounters()[0].value).toBe(20);

    component.onSortChange('value-asc');
    expect(component.displayedCounters()[0].value).toBe(10);
  });
});
