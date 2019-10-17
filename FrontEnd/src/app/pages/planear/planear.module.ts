import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlanearPage } from './planear.page';
import { VerRutasServices } from '../../services/verRutas.services';

const routes: Routes = [
  {
    path: '',
    component: PlanearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlanearPage],
  providers: [VerRutasServices]
})
export class PlanearPageModule {}
