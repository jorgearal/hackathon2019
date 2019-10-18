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

  title = 'Registrate';
    registro_nuevo: boolean;
    mostrarVehiculo: boolean;
    formularioPersona: RegistroPersona = { nombres: '', tipoDocumento: 1, celular: '', correo: '', cedula: '', apellidos: '' };

  constructor(private router: Router) { }

  ngOnInit() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.title = 'Actualizar datos';
      this.formularioPersona.apellidos = usuario.apellidos;
      this.formularioPersona.celular = usuario.celular;
      this.formularioPersona.nombres = usuario.nombres;
      this.formularioPersona.correo = usuario.correo;
      this.formularioPersona.cedula = usuario.cedula;
    }
  }

  compareFn(e1, e2): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
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
