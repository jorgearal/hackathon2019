import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisRutasPage } from './mis-rutas.page';

describe('MisRutasPage', () => {
  let component: MisRutasPage;
  let fixture: ComponentFixture<MisRutasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisRutasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisRutasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
