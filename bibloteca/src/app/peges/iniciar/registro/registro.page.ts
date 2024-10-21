import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserNuevo } from 'src/interface/users';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

  nuevoUsuario: UserNuevo={
    username:"",
    email:"",
    password:"",
    isactive:false
  }

  userdata: any;

  constructor(private authservice: AuthService,
              private alertcontroller: AlertController,
              private router: Router,
              private fBuilder: FormBuilder) {
                this.registroForm = this.fBuilder.group({
                  'username': new FormControl ("", [Validators.required, Validators.minLength(6)]),
                  'email': new FormControl ("", [Validators.required, Validators.email]),
                  'password': new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
                })
              }

  ngOnInit() {
  }

  crearUsuario(){
    if (this.registroForm.valid){
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp=>{
        this.userdata = resp;
        if(this.userdata.length>0){
          this.registroForm.reset();
          this.errorDuplicidad();
        }
        else{
          this.nuevoUsuario.username = this.registroForm.value.username;
          this.nuevoUsuario.password = this.registroForm.value.password;
          this.nuevoUsuario.email = this.registroForm.value.email;
          this.nuevoUsuario.isactive=true;
          this.authservice.PostUsuario(this.nuevoUsuario).subscribe();
          this.registroForm.reset();
          this.mostrarMensaje();
          this.router.navigateByUrl('/iniciar');
        }
      })
    }
  }
  
  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario creado',
      message: 'Bienvenido@! ' + this.nuevoUsuario.username,
      buttons: ['OK']
    });
    alerta.present();
  }

  async errorDuplicidad(){
    const alerta = await this.alertcontroller.create({
      header: 'Error..',
      message: 'Usted ' + this.nuevoUsuario.username + ' ya está registrado :D',
      buttons: ['OK']
    });
    alerta.present();
  }

  volver(){
    this.router.navigateByUrl('/comienzo');
  }

}
