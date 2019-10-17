import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IniciarViajePage } from './iniciar-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarViajePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IniciarViajePage]
})
export class IniciarViajePageModule {}
