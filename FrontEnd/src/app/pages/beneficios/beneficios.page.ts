import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'beneficios',
  templateUrl: './beneficios.page.html',
  styleUrls: ['./beneficios.page.scss'],
})
export class BeneficiosPage implements OnInit {

  constructor() { }
   fecha: string;

  ngOnInit() {
    this.fechaActual();
  }

  fechaActual() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.fecha = mm + '/' + dd + '/' + yyyy;
  }

}
