import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirVehiculoPage } from './compartir-vehiculo.page';

describe('CompartirVehiculoPage', () => {
  let component: CompartirVehiculoPage;
  let fixture: ComponentFixture<CompartirVehiculoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartirVehiculoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
