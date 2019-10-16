import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanearPage } from './planear.page';

describe('PlanearPage', () => {
  let component: PlanearPage;
  let fixture: ComponentFixture<PlanearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
