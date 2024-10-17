import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../service/api-user.service';
import { ILibro } from 'src/interface/bibloteca';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  libros: ILibro[] = [];
  borrar: string = '';
  public categoriaSeleccionada: string = '';  // Almacena la categoría seleccionada
  public categorias = ['Tecnología', 'Ciencia Ficción', 'Historia', 'Literatura', 'Medicina', 'otros'];
  public ver: boolean = false; // al estar en flase no se  muestra
  ciudadSeleccionada: string = ''; // Ciudad seleccionada por el usuario
  ciudades: string[] = ['Santiago', 'Valparaíso', 'Concepción']; // Listado de ciudades



  constructor(private router:Router , private apiUser: ApiUserService)  {}
  

ngOnInit(): void {
  this.bibloteca()

}
basededato(){
  this.ver = !this.ver;
  if (!this.ver){
    this.alumno();
    console.log('true')
  }else{
    this.bibloteca();
  }
}
//base dato 1
bibloteca(){
  this.apiUser.getBibloteca().subscribe(
    (data: ILibro[]) => {
      this.libros = data;
      console.log('Libros obtenidos:', this.libros); // Imprime los libros en la consola
    },
    error => {
      console.error('Error al obtener los libros', error); // Muestra el error en la consola
    }
  );
}
//base datos 2
alumno(){
  console.log('base datos nueva')
}

// Filtra los libros según la categoría seleccionada
filtrarLibros(libro: ILibro): boolean {
  return this.categoriaSeleccionada === '' || libro.categoria === this.categoriaSeleccionada;
}




  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
}
