import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { SavedCounter } from '../models/saved-counter';
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

  it('should add the newest saved counter to the beginning', () => {
    const first: SavedCounter = {
      id: 'first',
      name: 'První',
      value: 1,
    };
    const second: SavedCounter = {
      id: 'second',
      name: 'Druhé',
      value: 2,
    };

    component.onSaved(first);
    component.onSaved(second);

    expect(component.savedCounters).toEqual([second, first]);
  });

  it('should delete a saved counter by id', () => {
    const first: SavedCounter = {
      id: 'first',
      name: 'První',
      value: 1,
    };
    const second: SavedCounter = {
      id: 'second',
      name: 'Druhé',
      value: 2,
    };

    component.onSaved(first);
    component.onSaved(second);
    component.deleteCounter('first');

    expect(component.savedCounters).toEqual([second]);
  });

  it('should calculate the total sum of all saved counters', () => {
    expect(component.totalValue).toBe(0);

    component.onSaved({ id: '1', name: 'A', value: 10 });
    component.onSaved({ id: '2', name: 'B', value: 25 });

    expect(component.totalValue).toBe(35);
  });
});