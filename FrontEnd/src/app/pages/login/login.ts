import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { PersonaService } from '../../providers/persona-service';
import { ToastController, Events } from '@ionic/angular';



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
    private toastCtrl: ToastController,
    private personaService: PersonaService
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.personaService.login(this.login.username, this.login.password).subscribe((data) => {
        localStorage.clear();
        localStorage.setItem('usuario', JSON.stringify(data));
        this.events.publish('user:signup');
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
    this.router.navigateByUrl('/registrar');
  }

}
