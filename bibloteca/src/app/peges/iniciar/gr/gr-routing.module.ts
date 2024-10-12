import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrPage } from './gr.page';

const routes: Routes = [
  {
    path: '',
    component: GrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrPageRoutingModule {}
