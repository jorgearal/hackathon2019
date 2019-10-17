import { Component, OnInit } from '@angular/core';
import { VerRutasServices } from '../../services/verRutas.services';
import { DatosRuta } from '../../models/datosRuta';

@Component({
  selector: 'planear',
  templateUrl: './planear.page.html',
  styleUrls: ['./planear.page.scss'],
})
export class PlanearPage implements OnInit {
  datosRutas: any;
  constructor(private verRutaService: VerRutasServices) { }

  ngOnInit() {
    this.verRutaService.verRutasPorPersona('1').subscribe((resp) => {
      this.datosRutas = resp;
      console.log('--------->', this.datosRutas);
    });
  }
}
