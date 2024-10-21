import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarioForm: FormGroup;
  ver: boolean = false;
  usuario: any = {}; // Inicializar usuario como un objeto vacío

  constructor(private authService: AuthService,
              private fBuilder: FormBuilder,
              private router: Router) {
    this.usuarioForm = this.fBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.cargarDatosUsuario(); // Cargar los datos del usuario al iniciar la página
  }

  cargarDatosUsuario() {
    const username = sessionStorage.getItem('username'); // Obtener el nombre de usuario desde sessionStorage
    if (username) {
      this.authService.getByUsername(username).subscribe(data => {
        if (data) {
          this.usuario = data;
          // Establecer los valores en el formulario
          this.usuarioForm.patchValue({
            nombre: this.usuario.username,
            email: this.usuario.email
          });
        }
      });
    }
  }

  datoeditar() {
    this.ver = true; // Cambiar a modo de edición
  }

  datoguardar() {
    if (this.usuarioForm.valid) {
      // Actualizamos el objeto usuario con los nuevos valores del formulario
      this.usuario.username = this.usuarioForm.value.nombre;
      this.usuario.email = this.usuarioForm.value.email;

      // Llamamos al método de actualización del AuthService
      this.authService.updateUsuario(this.usuario).subscribe(response => {
        console.log('Datos guardados:', response);
        // Guardar la nueva información en sessionStorage si es necesario
        sessionStorage.setItem('username', this.usuario.username);
        this.ver = false; // Salir del modo de edición
      }, error => {
        console.error('Error al actualizar el usuario:', error);
      });
    }
  }

  regresar() {
    this.router.navigate(['/tabs/tab1']);
  }
}
