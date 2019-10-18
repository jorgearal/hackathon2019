import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { PersonaService } from '../../providers/persona-service';
import { ToastController } from '@ionic/angular';



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
    private toastCtrl: ToastController,
    private personaService: PersonaService
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.personaService.login(this.login.username, this.login.password).subscribe((data) => {
        localStorage.clear();
        localStorage.setItem('usuario', JSON.stringify(data));
        this.router.navigateByUrl('/bienvenido');
      }, (error) => {
        this.toastCtrl.create({
          message: '<br>Credenciales invalidas<br><br>',
          duration: 3000,
          color: 'danger',
          position: 'middle'
        }).then((e) => {
          e.present();
        });
      });;
    }
  }

  registrarse() {
    localStorage.setItem('registroNuevo', 'SI' );
    this.router.navigateByUrl('/registrar');
  }

}
