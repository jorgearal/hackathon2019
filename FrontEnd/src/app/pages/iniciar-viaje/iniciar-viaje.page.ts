import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruta } from '../../models/ruta-model';
import { Vehiculo } from '../../models/vehiculo-model';
import { Persona } from '../../models/persona-model';
import { RutaService } from '../../services/ruta.service';
import { Constantes } from '../../shared/constantes';

@Component({
  selector: 'iniciar-viaje',
  templateUrl: './iniciar-viaje.page.html',
  styleUrls: ['./iniciar-viaje.page.scss'],
})
export class IniciarViajePage implements OnInit {

  id: string;
  iniciar: boolean = true;
  ruta: Ruta;
  vehiculo: Vehiculo;
  listaPersonas: Persona[];
  speakers: any[] = [{ 'profilePic': null, 'name': 'Carlos Javier Cepeda', 'confirmado': false }, { 'profilePic': null, 'name': 'Oscar Andres Lopez', 'confirmado': true }, { 'profilePic': null, 'name': 'Carina Dorado', 'confirmado': true }];

  infoRuta: any;


  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private router: Router, private rutaService: RutaService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.router.navigateByUrl('/compartirVehiculo');
    } else {
      this.rutaService.consultarDetalleRuntaXId(this.id).subscribe(
        (data) => {
          this.infoRuta = data;
          if (this.infoRuta.estado == 1) {
            this.iniciar = false;
          }
          console.log(JSON.stringify(this.infoRuta));
        },
        (error) => {
          this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO);
        });
      this.listaPersonas = [];
    }
    console.log("*****" + this.id);
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
  presentConfirmStarRuta() {
    const alert = this.alertCtrl.create({
      message: 'Esta seguro de iniciar la ruta?',
      subHeader: 'Confirmación',
      buttons: [{
        text: 'Aceptar', handler: () => {
          this.rutaService.cambiarEstadoRuta(this.infoRuta.id, 1).subscribe((data) => {
            this.mostrarMensaje("El viaje a iniciado exitosamente");
            this.iniciar = false;
            this.router.navigateByUrl('/rutaActiva/'+this.infoRuta.id);
          }, (error) => { this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO); });
        }
      }, {
        text: 'Cancel', handler: () => {
          console.log("Cancelar viaje..");
        }
      }]
    }).then(alert => alert.present());
  }


  presentFinalizarViajeRuta() {
    const alert = this.alertCtrl.create({
      message: 'Esta seguro de cancelar la ruta?',
      subHeader: 'Confirmación',
      buttons: [{
        text: 'Aceptar', handler: () => {
          
          this.rutaService.cambiarEstadoRuta(this.infoRuta.id, 3).subscribe((data) => {
            this.mostrarMensaje("El viaje a terminado exitosamente");
            this.router.navigateByUrl('/compartirVehiculo/');
          }, (error) => { this.mostrarMensaje(Constantes.MENSAJE_ERROR_SERVICIO); });


        }
      }, {
        text: 'Cancel', handler: () => {
          console.log("Cancelar viaje..");
        }
      }]
    }).then(alert => alert.present());
  }

}
