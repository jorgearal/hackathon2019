import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompartirVehiculoPage } from './compartir-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: CompartirVehiculoPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompartirVehiculoPage]
})
export class CompartirVehiculoPageModule {}
