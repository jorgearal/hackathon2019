import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajePage } from './puntaje.page';

describe('PuntajePage', () => {
  let component: PuntajePage;
  let fixture: ComponentFixture<PuntajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
