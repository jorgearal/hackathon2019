import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaActivaPage } from './ruta-activa.page';

describe('RutaActivaPage', () => {
  let component: RutaActivaPage;
  let fixture: ComponentFixture<RutaActivaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaActivaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaActivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
