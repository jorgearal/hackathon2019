import { Component, OnInit } from '@angular/core';
import { RegistroVehiculo } from '../../interfaces/registro-vehiculo';
import { VehiculoService } from '../../services/vehiculo.service';

@Component({
  selector: 'registrar-vehiculo',
  templateUrl: './registrar-vehiculo.page.html',
  styleUrls: ['./registrar-vehiculo.page.scss'],
})
export class RegistrarVehiculoPage implements OnInit {
  registro_nuevo: boolean;
  infoVehiculo: any;

  constructor(private vehiculoService: VehiculoService) { }
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
    if (usuario) {
        this.vehiculoService.consultarVehiculoXIdPersona(usuario.id).subscribe((resp) => {
        this.infoVehiculo = resp;
        console.log(this.infoVehiculo[0]);
        this.title = 'Actualizar datos';
        this.formularioVehiculo.color = this.infoVehiculo[0].color.toUpperCase();
        this.formularioVehiculo.marca = this.infoVehiculo[0].marca;
        this.formularioVehiculo.modelo = this.infoVehiculo[0].modelo;
        this.formularioVehiculo.placa = this.infoVehiculo[0].placa;
        this.formularioVehiculo.puestos = this.infoVehiculo[0].numeroPuestos;
        this.formularioVehiculo.referencia = this.infoVehiculo[0].referencia;
      });
    }
  }

  guardarDatosVehiculo() {
    window.history.back();
  }

  salir() {
    window.history.back();

  }

}
