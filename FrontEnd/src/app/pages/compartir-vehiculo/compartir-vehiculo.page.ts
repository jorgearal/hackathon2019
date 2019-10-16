import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../providers/persona-service';

@Component({
  selector: 'compartir-vehiculo',
  templateUrl: './compartir-vehiculo.page.html',
  styleUrls: ['./compartir-vehiculo.page.scss'],
})
export class CompartirVehiculoPage implements OnInit {

  constructor(private personaService:PersonaService) { 
    console.log("******************");
    console.log(this.personaService.servicioPrueba());
  }

  ngOnInit() {
  }

}
