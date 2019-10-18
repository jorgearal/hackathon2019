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

    title = 'Registrar vehiculos';

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

      this.title = 'Actualizar datos';
      this.formularioVehiculo.color = usuario.apellidos;
      this.formularioVehiculo.fechaSoat = usuario.celular;
      this.formularioVehiculo.fechaTecnicoMecanica = usuario.nombres;
      this.formularioVehiculo.fotoMatricula = usuario.correo;
      this.formularioVehiculo.fotoVehiculo = usuario.cedula;
      this.formularioVehiculo.marca = usuario.cedula;
      this.formularioVehiculo.modelo = usuario.cedula;
      this.formularioVehiculo.placa = usuario.cedula;
      this.formularioVehiculo.puestos = usuario.cedula;
      this.formularioVehiculo.referencia = usuario.cedula;
  }

  guardarDatosVehiculo() {
    window.history.back();
  }

  salir() {
    window.history.back();

  }

}
