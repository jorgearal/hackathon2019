import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarViajePage } from './iniciar-viaje.page';

describe('IniciarViajePage', () => {
  let component: IniciarViajePage;
  let fixture: ComponentFixture<IniciarViajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarViajePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
