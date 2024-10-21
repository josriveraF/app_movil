import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RePage } from './re.page';

const routes: Routes = [
  {
    path: '',
    component: RePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RePageRoutingModule {}
