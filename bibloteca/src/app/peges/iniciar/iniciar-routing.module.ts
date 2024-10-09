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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarPageRoutingModule {}
