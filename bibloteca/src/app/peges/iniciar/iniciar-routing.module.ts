import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IniciarPage } from './iniciar.page';

const routes: Routes = [
  {
    path: '',
    component: IniciarPage
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioPageModule)
  },
  {
    path: 'gr',
    loadChildren: () => import('./gr/gr.module').then(m => m.GrPageModule)
  },
  {
    path: 'mibiblioteca',  // Corrige el nombre si estaba mal escrito
    loadChildren: () => import('./mibibloteca/mibibloteca.module').then(m => m.MibiblotecaPageModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./solicitud/solicitud.module').then(m => m.SolicitudPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarPageRoutingModule {}

