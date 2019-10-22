import { Component, OnInit } from '@angular/core';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ViajeService } from '../../services/viaje.service';
import { AlertController } from '@ionic/angular';
import { Constantes } from '../../shared/constantes';

@Component({
  selector: 'qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  activarCamara: boolean = false;
  suscrito: boolean = false;

  infoRuta: any;
  infoPersona: any;
  infoConsulta: any;

  objViaje: any;
  confirmado: boolean = false;
  mensaje: string;
  confirmaViaje: number = 0;

  //private qrScanner: QRScanner, 
  constructor(private viajeService: ViajeService, private alertCtrl: AlertController) {
    //this.infoRuta = {};
    //this.infoPersona = {};
    this.objViaje = {};
  }

  ngOnInit() {
    console.log("------------------------------------------------------");
    this.infoPersona = JSON.parse(localStorage.getItem('usuario'));
    //console.log(JSON.stringify(this.infoPersona));
    if (this.infoPersona && this.infoPersona.id) {
      this.validarInfoRUta();

    } else {
      this.suscrito = false;
    }
  }

  validarInfoRUta() {
    console.log("-------------->>>>>>-----------" + this.infoPersona.id);
    this.viajeService.consultarRutaPasajero(this.infoPersona.id).subscribe(
      (data) => {
        if (data) {
          this.objViaje.id= data.id;
          this.infoConsulta = data;
          //console.log(JSON.stringify(this.infoConsulta));
          this.infoRuta = data.ruta;
          this.suscrito = true;
          this.confirmaViaje = this.infoConsulta.confirmaViaje;
          if (this.infoConsulta.confirmaViaje == 0) {
            this.confirmado = false;
          } else if (this.infoConsulta.confirmaViaje == 1) {
            this.confirmado = true;
            this.mensaje = "Usted ya realizó la confirmación del viaje y este se encuentrá activo hasta llegar al punto de destino.";
          } else if (this.infoConsulta.confirmaViaje == 2) {
            this.confirmado = true;
            this.mensaje = "Usted realizó la cancelación del viaje.";
          }
        } else {
          this.suscrito = false;
        }
      },
      (error) => {
        this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO);
      });
  }


  confirmarViaje() {
    this.objViaje.rutaDto = this.infoRuta;
    this.objViaje.personaDto = this.infoPersona;
    this.objViaje.confirmaViaje = 1;
    this.viajeService.suscribirARuta(this.objViaje).subscribe((data) => {
      this.mostrarMensaje("Haz realizado la confirmación de la ruta de forma extosa. Hora ganar más puntos!!");
      this.confirmado = true;
      this.confirmaViaje = 1;
      this.objViaje = data;
    }, (error) => {this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO); });
    
  }

  cancelarViaje() {
    this.objViaje.rutaDto = this.infoRuta;
    this.objViaje.personaDto = this.infoPersona;
    this.objViaje.confirmaViaje = 2;
    this.viajeService.suscribirARuta(this.objViaje).subscribe((data) => {
      this.mostrarMensaje("Haz realizado la cancelación de tu puesto en la ruta. Te esperamos pronto!!");
      this.confirmado = true;
      this.confirmaViaje = 2;
      this.objViaje = data;
    }, (error) => {this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO); });
    
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


  /*leerCodigo() {
    // Pedir permiso de utilizar la camara
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // el permiso fue otorgado
        // iniciar el escaneo
        let scanSub = this.qrScanner.scan().subscribe((texto: string) => {
          console.log('Scanned something', texto);

          this.qrScanner.hide(); // esconder el preview de la camara
          scanSub.unsubscribe(); // terminar el escaneo
        });

      } else if (status.denied) {
        // el permiso no fue otorgado de forma permanente
        // debes usar el metodo QRScanner.openSettings() para enviar el usuario a la pagina de configuracion
        // desde ahí podrán otorgar el permiso de nuevo
      } else {
        // el permiso no fue otorgado de forma temporal. Puedes pedir permiso de en cualquier otro momento
      }
    }).catch((e: any) => console.log('El error es: ', e));
  }*/

}
