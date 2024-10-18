import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from 'src/service/api-user.service';
import { ILibro } from 'src/interface/bibloteca';
import { Iprestamo } from 'src/interface/bibloteca';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  libros: ILibro[] = [];
  borrar: string = '';
  public categoriaSeleccionada: string = ''; // Almacena la categoría seleccionada
  public categorias = ['Tecnología', 'Ciencia Ficción', 'Historia', 'Literatura', 'Medicina', 'otros'];
  public ver: boolean = false; // Al estar en false no se muestra
  public opcion: boolean = false;
 pres: Iprestamo []=[];

  libroSeleccionado!: ILibro ;  // Libro seleccionado por el usuario
  usuario_id!: number; // Debes asignar el id del usuario desde alguna parte de tu aplicación
  diasPrestamo: number = 1; // Días de préstamo, por defecto 1 día
  estado: string = 'activo'; // Estado del préstamo

  constructor(private router: Router, private apiUser: ApiUserService) {}

  ngOnInit(): void {
    this.bibloteca();
  }

  basededato() {
    this.ver = !this.ver;
    if (!this.ver) {
      this.alumno();
      console.log('true');
    } else {
      this.bibloteca();
    }
  }
seleccionarLibro(libro: ILibro) {
    this.libroSeleccionado = libro;
    console.log('Libro seleccionado:', this.libroSeleccionado);
    this.opcion=!this.opcion;
   
  }
  // Método para registrar el préstamo
  prestamo( ) {
    
    const fechaPrestamo = new Date();
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaPrestamo.getDate() + this.diasPrestamo);

    const prestamo: Iprestamo = {
      usuario_id: 1,  // Asegúrate de asignar el id del usuario
      libro_id: this.libroSeleccionado.id,  // Asegúrate de que el libro esté seleccionado
      fecha_prestamo: fechaPrestamo.toISOString(),
      fecha_devolucion: fechaDevolucion.toISOString(),
      estado: this.estado
    };

    this.apiUser.postprestamo(prestamo).subscribe(
      (response) => {
        console.log('Préstamo registrado:', response);
        alert('El libro ha sido prestado exitosamente');
      },
      (error) => {
        console.error('Error al registrar el préstamo', error);
      }
    );
    this.router.navigate(['/tabs/tab3']);
    this.opcion=false;
    

    console.log('Datos del préstamo:', prestamo);
  }

  

  // Método para obtener la lista de libros
  bibloteca() {
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

  // Método para alternar entre bases de datos (por implementar)
  alumno() {
    console.log('base datos nueva');
  }

  // Filtra los libros según la categoría seleccionada
  filtrarLibros(libro: ILibro): boolean {
    return this.categoriaSeleccionada === '' || libro.categoria === this.categoriaSeleccionada;
  }

  // Método para regresar a la pestaña 1
  regresar() {
    this.router.navigate(['/tabs/tab1']);
  }
  regresar1() {
    this.router.navigate(['/tabs/tab3']);
    this.opcion=false;
  
  }
}
