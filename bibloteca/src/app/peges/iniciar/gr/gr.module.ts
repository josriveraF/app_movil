import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { IonicModule } from '@ionic/angular';

import { GrPageRoutingModule } from './gr-routing.module';

import { GrPage } from './gr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [GrPage]
})
export class GrPageModule {}
