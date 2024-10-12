import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  ver: boolean = false; // al estar en flase no se  muestra
  constructor(private router:Router) { }
// Función para cambiar a modo edición
datoeditar() {
  this.ver = true;
}
regresar(){
  this.router.navigate(['/tabs/tab1']);
}
// Función para guardar los cambios y bloquear el formulario
datoguardar() {
  this.ver = false;
  // Aquí puedes agregar la lógica para guardar los datos
  console.log("Datos guardados");
}
  ngOnInit() {
  }
 
}
