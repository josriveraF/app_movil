import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciarPage } from './iniciar.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarPage
  },  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 're',
    loadChildren: () => import('./re/re.module').then( m => m.RePageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'gr',
    loadChildren: () => import('./gr/gr.module').then( m => m.GrPageModule)
  },
  {
    path: 'mibibloteca',
    loadChildren: () => import('./mibibloteca/mibibloteca.module').then( m => m.MibiblotecaPageModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarPageRoutingModule {}
