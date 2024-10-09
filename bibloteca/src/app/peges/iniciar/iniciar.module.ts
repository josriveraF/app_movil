import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciarPageRoutingModule } from './iniciar-routing.module';

import { IniciarPage } from './iniciar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciarPageRoutingModule
  ],
  declarations: [IniciarPage]
})
export class IniciarPageModule {}
