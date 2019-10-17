import { Component, OnInit } from '@angular/core';
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

  /*formularioPersona:  RegistroPersona = {
    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    celular: '',
    tipoDocumento: 1 };*/


    formularioPersona: RegistroPersona = { nombres: '', tipoDocumento: 1, celular: '', correo: '', cedula: '', apellidos: '' };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  diligenciarVehiculo() {
    this.router.navigateByUrl('/app/tabs/registrarVehiculo');

  }

}
