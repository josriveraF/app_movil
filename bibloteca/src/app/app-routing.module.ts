import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/iniciar',
    pathMatch: 'full'
  },
  {
    path: 'iniciar',
    loadChildren: () => import('./peges/iniciar/iniciar.module').then(m => m.IniciarPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./peges/iniciar/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',  // Cambia aquí la ruta para el registro
    loadChildren: () => import('./peges/iniciar/registro/registro.module').then(m => m.RegistroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

