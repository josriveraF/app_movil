import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RePageRoutingModule } from './re-routing.module';

import { RePage } from './re.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RePageRoutingModule
  ],
  declarations: [RePage]
})
export class RePageModule {}
