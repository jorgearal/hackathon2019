import { Component, OnInit } from '@angular/core';
import { VerRutasServices } from '../../services/verRutas.services';
import { ModalController } from '@ionic/angular';
import { DetalleRutaPage } from '../detalle-ruta/detalle-ruta.page';

@Component({
  selector: 'planear',
  templateUrl: './planear.page.html',
  styleUrls: ['./planear.page.scss'],
})
export class PlanearPage implements OnInit {
  datosRutas: any;
  dataReturned: any;

  constructor(private verRutaService: VerRutasServices, private modalController: ModalController) { }

  ngOnInit() {
    this.verRutaService.verRutasPorPersona('1').subscribe((resp) => {
      this.datosRutas = resp;
    });
  }

  verDetalleRuta() {
//    const modal = this.modal.create();
  //  modal.present();
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: DetalleRutaPage,
      componentProps: {
        'idViaje': 17
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });

    return await modal.present();
  }

}
