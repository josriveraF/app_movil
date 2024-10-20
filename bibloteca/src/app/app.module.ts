import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiUserService } from 'src/service/api-user.service';
import { provideHttpClient } from '@angular/common/http'; // Importa aquí
import { QRCodeModule } from 'angularx-qrcode';
import { ReactiveFormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,QRCodeModule,ReactiveFormsModule
  ],
  providers: [
    ApiUserService,
    provideHttpClient() // Proporciona HttpClient aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
