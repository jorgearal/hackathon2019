import { Component, OnInit } from '@angular/core';
import { VerRutasServices } from '../../services/verRutas.services';
import { DatosRuta } from '../../models/datosRuta';

@Component({
  selector: 'planear',
  templateUrl: './planear.page.html',
  styleUrls: ['./planear.page.scss'],
})
export class PlanearPage implements OnInit {
  datosRutas: DatosRuta[] = [];
  constructor(private verRutaService: VerRutasServices) { }

  ngOnInit() {
    this.verRutas();
    console.log(this.datosRutas);
  }

  verRutas() {
    this.verRutaService.verRutasPorPersona('1').subscribe((resp) => {
      this.datosRutas = resp;
    });
  }
}
