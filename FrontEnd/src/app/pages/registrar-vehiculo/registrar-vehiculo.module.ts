import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegistrarVehiculoPage } from './registrar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarVehiculoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegistrarVehiculoPage]
})
export class RegistrarVehiculoPageModule {}
