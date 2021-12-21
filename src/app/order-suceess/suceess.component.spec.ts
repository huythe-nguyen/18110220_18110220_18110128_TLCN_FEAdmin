import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuceessComponent } from './suceess.component';

describe('SuceessComponent', () => {
  let component: SuceessComponent;
  let fixture: ComponentFixture<SuceessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuceessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuceessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
