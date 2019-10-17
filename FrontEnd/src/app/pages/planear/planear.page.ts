import { Component, OnInit } from '@angular/core';
import { VerRutasServices } from '../../services/verRutas.services';

@Component({
  selector: 'planear',
  templateUrl: './planear.page.html',
  styleUrls: ['./planear.page.scss'],
})
export class PlanearPage implements OnInit {

  constructor(private verRutaService: VerRutasServices) { }

  ngOnInit() {
  }

  verRutas() {
    this.verRutaService.verRutasPorPersona('1').subscribe((resp) => {
      
    });
  }
}
