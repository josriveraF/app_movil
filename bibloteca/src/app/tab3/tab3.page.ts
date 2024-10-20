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
  public categorias = ['Tecnología', 'Ciencia Ficción', 'Historia', 'Literatura', 'Medicina', 'otro'];
  public ver: boolean = false; // Al estar en false no se muestra
  public opcion: boolean = false;
  public verqr: boolean = true;
  public categoo ='';
 pres: Iprestamo []=[];

  libroSeleccionado!: ILibro ;  // Libro seleccionado por el usuario
  usuario_id!: number; // Debes asignar el id del usuario desde alguna parte de tu aplicación
  diasPrestamo: number = 1; // Días de préstamo, por defecto 1 día
  estado: string = 'activo'; // Estado del prést¿
  qrdata:string;

  constructor(private router: Router, private apiUser: ApiUserService) {this.qrdata=''}

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
    
    
    this.opcion=true; 
    setTimeout(() => {
      console.log('Opción cambiada a false después de 15 segundos');
      this.router.navigate(['/tabs/tab3']);
      this.opcion=false; 
      this.diasPrestamo=1;
      this.qrdata='';
    }, 15000); // 
    // qr dentro del button prestamo
    const prestamoInfo = {
      usuario_id: 1,  // Cambia esto según el usuario actual
      libro_id: this.libroSeleccionado.id,  // Debe estar seleccionado un libro
      diasPrestamo: this.diasPrestamo
      
    };
    
    this.qrdata = JSON.stringify(prestamoInfo); // Convierte los datos a un formato legible (JSON)
    console.log(this.qrdata);
    
    

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
    this.qrdata='';
    this.diasPrestamo=1;
  
  }
}
