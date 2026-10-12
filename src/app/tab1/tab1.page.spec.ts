import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
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

  it('should increment the counter', () => {
    component.increment();

    expect(component.count).toBe(1);
  });

  it('should decrement but never go below zero', () => {
    component.decrement();
    expect(component.count).toBe(0);

    component.count = 2;
    component.decrement();
    expect(component.count).toBe(1);
  });

  it('should reset the counter and update the template', () => {
    component.count = 5;
    component.reset();
    fixture.detectChanges();

    const value = fixture.nativeElement.querySelector(
      '.counter-value',
    ) as HTMLElement;

    expect(component.count).toBe(0);
    expect(value.textContent?.trim()).toBe('0');
  });

  it('should support step property for increment and decrement', () => {
    component.step = 3;
    component.increment();
    expect(component.count).toBe(3);

    component.decrement();
    expect(component.count).toBe(0);
  });

  it('should increment by 5 and decrement by 5 without going below zero', () => {
    component.increment(5);
    expect(component.count).toBe(5);

    component.increment(5);
    expect(component.count).toBe(10);

    component.decrement(5);
    expect(component.count).toBe(5);

    component.decrement(5);
    expect(component.count).toBe(0);

    // Cannot go below zero
    component.decrement(5);
    expect(component.count).toBe(0);
  });

  it('should reset both counter value and name when resetAll is called', () => {
    component.count = 10;
    component.counterName = 'Návštěvníci';

    component.resetAll();

    expect(component.count).toBe(0);
    expect(component.counterName).toBe('');
  });
});