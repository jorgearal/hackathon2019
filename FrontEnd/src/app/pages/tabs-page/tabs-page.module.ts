import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { SpeakerListModule } from '../speaker-list/speaker-list.module';
import { CompartirVehiculoPageModule } from '../compartir-vehiculo/compartir-vehiculo.module';
import { BienvenidoPageModule } from '../bienvenido/bienvenido.module';
import { PlanearPageModule } from '../planear/planear.module';
import { RegistrarPageModule } from '../registrar/registrar.module';
import { RegistrarVehiculoPageModule } from '../registrar-vehiculo/registrar-vehiculo.module';
import { BeneficiosPageModule } from '../beneficios/beneficios.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    ScheduleModule,
    SessionDetailModule,
    SpeakerDetailModule,
    SpeakerListModule,
    TabsPageRoutingModule,
    CompartirVehiculoPageModule,
    BienvenidoPageModule,
    PlanearPageModule,
    RegistrarPageModule,
    RegistrarVehiculoPageModule,
    BeneficiosPageModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
