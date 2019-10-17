import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



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
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      localStorage.setItem('registroNuevo', 'NO' );
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/login');
    }
  }

  registrarse() {
    localStorage.setItem('registroNuevo', 'SI' );
    this.router.navigateByUrl('/registrar');
  }

}
