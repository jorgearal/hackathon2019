import { Component, OnInit } from '@angular/core';
import { RegistroVehiculo } from '../../interfaces/registro-vehiculo';

@Component({
  selector: 'registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage implements OnInit {
  registro_nuevo: boolean;

  constructor() { }
  // tslint:disable-next-line:max-line-length
  formularioVehiculo: RegistroVehiculo = { 
    color: '',
    marca: '',
    fotoMatricula: '',
    fotoVehiculo: '',
    modelo: 2019,
    placa: '',
    puestos: 4,
    referencia: '',
    fechaSoat: '',
    fechaTecnicoMecanica: ''};

  ngOnInit() {
    localStorage.getItem('registroNuevo');
    if ( localStorage.getItem('registroNuevo') !== null && localStorage.getItem('registroNuevo') !== undefined) {
      if (localStorage.getItem('registroNuevo')  === 'SI') {
          this.registro_nuevo = true;
      } else {
        this.registro_nuevo = false;
      }
    }

  }

  guardarDatosVehiculo() {
    window.history.back();
  }

  salir() {
    window.history.back();

  }

}
