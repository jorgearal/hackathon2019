import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Ruta } from '../../models/ruta-model';
import { Vehiculo } from '../../models/vehiculo-model';
import { Persona } from '../../models/persona-model';

@Component({
  selector: 'iniciar-viaje',
  templateUrl: './iniciar-viaje.page.html',
  styleUrls: ['./iniciar-viaje.page.scss'],
})
export class IniciarViajePage implements OnInit {

  id: string;
  iniciar:boolean = true;
  ruta:Ruta;
  vehiculo:Vehiculo;
  listaPersonas: Persona[];
  speakers:any[]=[{'profilePic':null,'name':'Carlos Javier Cepeda','confirmado':false},{'profilePic':null,'name':'Oscar Lopez','confirmado':true},{'profilePic':null,'name':'Lina Gonzales','confirmado':true}];

  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.router.navigateByUrl('/compartirVehiculo');
    } else {
      this.listaPersonas = [];
    }
    console.log("*****" + this.id);
  }





  presentConfirmStarRuta() {
    const alert = this.alertCtrl.create({
      message: 'Esta seguro de iniciar la ruta?',
      subHeader: 'Confirmación',
      buttons: [{
        text: 'Aceptar', handler: () => {
          this.iniciarViaje();
        }
      }, {
        text: 'Cancel', handler: () => {
          console.log("Cancelar viaje..");
        }
      }]
    }).then(alert => alert.present());
  }

  iniciarViaje() {

  }

}
