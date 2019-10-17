import { Component, OnInit } from '@angular/core';
import { RegistroVehiculo } from '../../interfaces/registro-vehiculo';

@Component({
  selector: 'registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage implements OnInit {

  constructor() { }
  //formularioVehiculo: RegistroVehiculo = { color: '', marca: '', fotoMatricula: '', fotoVehiculo: '', modelo: 2019, placa: '', puestos: 4 };

  ngOnInit() {
  }

}
