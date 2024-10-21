import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiUserService } from 'src/service/api-user.service';
import { provideHttpClient } from '@angular/common/http'; // Importa aquí
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioPageModule } from './peges/iniciar/usuario/usuario.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ApiUserService,
    provideHttpClient() // Proporciona HttpClient aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
