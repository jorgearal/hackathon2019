import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroPersona } from '../../interfaces/registro-personas';
import { UserOptions } from '../../interfaces/user-options';
import { Router } from '@angular/router';

@Component({
  selector: 'registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

    registro_nuevo: boolean;
    mostrarVehiculo: boolean;
    formularioPersona: RegistroPersona = { nombres: '', tipoDocumento: 1, celular: '', correo: '', cedula: '', apellidos: '' };

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.getItem('registroNuevo');
    if ( localStorage.getItem('registroNuevo') !== null && localStorage.getItem('registroNuevo') !== undefined) {
      if (localStorage.getItem('registroNuevo')  === 'SI') {
          this.registro_nuevo = true;
      } else {
        this.registro_nuevo = false;
        this.mostrarVehiculo = true;
      }
    }
  }


guardarDatosPersonales() {
  this.mostrarVehiculo = true;
}

  diligenciarVehiculo() {
    this.router.navigateByUrl('/registrarVehiculo');
  }

  salir() {
    if (this.registro_nuevo) {
      this.router.navigateByUrl('/login');
    } else {
      window.history.back();
    }
  }

}
