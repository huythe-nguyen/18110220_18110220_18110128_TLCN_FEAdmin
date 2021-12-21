/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditOderComponent } from './edit-oder.component';

describe('EditOderComponent', () => {
  let component: EditOderComponent;
  let fixture: ComponentFixture<EditOderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
