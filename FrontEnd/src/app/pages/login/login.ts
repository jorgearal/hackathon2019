import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { PersonaService } from '../../providers/persona-service';
import { AlertController, Events } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})

export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private events: Events,
    private alertCtrl: AlertController,
    private personaService: PersonaService
  ) { }

  onLogin(form: NgForm) {
    console.log("login!!!");
    this.submitted = true;

    if (form.valid) {
      this.personaService.login(this.login.username, this.login.password).subscribe((data) => {
        localStorage.clear();
        localStorage.setItem('usuario', JSON.stringify(data));
        this.events.publish('user:signup');
        this.router.navigateByUrl('/bienvenido');
      }, (error) => {
        this.mostrarMensaje("Credenciales invalidas");
      });
    }
  }

  mostrarMensaje(texto) {
    const alert = this.alertCtrl.create({
      message: texto,
      subHeader: 'Información',
      buttons: [{
        text: 'Aceptar', handler: () => {
        }
      }]
    }).then(alert => alert.present());
  }


  registrarse() {
    this.router.navigateByUrl('/registrar');
  }

}
