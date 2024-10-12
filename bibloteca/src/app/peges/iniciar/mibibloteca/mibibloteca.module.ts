import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MibiblotecaPageRoutingModule } from './mibibloteca-routing.module';

import { MibiblotecaPage } from './mibibloteca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MibiblotecaPageRoutingModule
  ],
  declarations: [MibiblotecaPage]
})
export class MibiblotecaPageModule {}
