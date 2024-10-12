import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrPageRoutingModule } from './gr-routing.module';

import { GrPage } from './gr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrPageRoutingModule
  ],
  declarations: [GrPage]
})
export class GrPageModule {}
