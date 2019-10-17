import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/registrar/registrar.module').then(m => m.RegistrarPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  { path: 'compartir-vehiculo', loadChildren: './pages/compartir-vehiculo/compartir-vehiculo.module#CompartirVehiculoPageModule' },
  { path: 'bienvenido', loadChildren: './pages/bienvenido/bienvenido.module#BienvenidoPageModule' },
  { path: 'buscar-ruta', loadChildren: './pages/buscar-ruta/buscar-ruta.module#BuscarRutaPageModule' },
  { path: 'planear', loadChildren: './pages/planear/planear.module#PlanearPageModule' },
  { path: 'registrar', loadChildren: './pages/registrar/registrar.module#RegistrarPageModule' },
  { path: 'registrar-vehiculo', loadChildren: './pages/registrar-vehiculo/registrar-vehiculo.module#RegistrarVehiculoPageModule' },
  { path: 'beneficios', loadChildren: './pages/beneficios/beneficios.module#BeneficiosPageModule' },
  { path: 'registrar', loadChildren: './pages/registrar/registrar.module#RegistrarPageModule' },
  { path: 'registrar-vehiculo', loadChildren: './pages/registrar-vehiculo/registrar-vehiculo.module#RegistrarVehiculoPageModule' },
  { path: 'iniciar-viaje/:id', loadChildren: './pages/iniciar-viaje/iniciar-viaje.module#IniciarViajePageModule' },
  { path: 'puntaje', loadChildren: './pages/puntaje/puntaje.module#PuntajePageModule' },
  { path: 'mis-rutas', loadChildren: './pages/mis-rutas/mis-rutas.module#MisRutasPageModule' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
