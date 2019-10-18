import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'indicaciones',
  templateUrl: './indicaciones.component.html',
  styleUrls: ['./indicaciones.component.scss'],
})
export class IndicacionesComponent implements OnInit {

  @ViewChild('slider', { static: false })slider: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor() { }

  ngOnInit() {}

  moveToSlide(indice:number) {
    this.slider.slideTo(indice);
  }

}
