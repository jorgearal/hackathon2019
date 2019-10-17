import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { Events, MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { Persona } from './models/persona-model';
import { PersonaService } from './providers/persona-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  persona: Persona;


  appPages = [
    {
      title: 'Buscar ruta',
      url: '/bienvenido',
      icon: 'car'
    },
    {
      title: 'Compartir Ruta',
      url: '/compartirVehiculo',
      icon: 'add'
    },
    {
      title: 'Mis Viajes',
      url: '/planear',
      icon: 'cash'
    },
    {
      title: 'Mis Logros',
      url: '/puntaje',
      icon: 'medal'
    },
    {
      title: 'Confirmar viaje',
      url: '/puntaje',
      icon: 'ios-qr-scanner'
    },
    {
      title: 'Parqueadero',
      url: '/map',
      icon: 'map'
    },
    {
      title: 'Meta Mensual',
      url: '/beneficios',
      icon: 'trending-up'
    },
    {
      title: 'Ayuda',
      url: '/about',
      icon: 'information-circle'
    },

  ];
  loggedIn = false;
  dark = false;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private personaService: PersonaService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });

    // se consulta los datos de la persona
    this.personaService.consultarInfoPersonaXId(1).subscribe((data) => {
      this.persona = data;
      console.log(JSON.stringify(data));
    }, (error) => {
      alert('Los servicios no se encuentran disponibles');
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userData.logout().then(() => {
      return this.router.navigateByUrl('/login');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
