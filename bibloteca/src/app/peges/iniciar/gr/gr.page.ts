import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAlumnoService } from 'src/service/api-alumno.service';
import { IlisPrestado } from 'src/interface/bibloteca';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-gr',
  templateUrl: './gr.page.html',
  styleUrls: ['./gr.page.scss'],
})
export class GrPage implements OnInit, OnDestroy {
  listado: IlisPrestado[] = [];  // Almacena el listado de préstamos
  timerSubscription!: Subscription; // Suscripción para el timer
  qrdata: string = '';           // Datos que se convertirán en QR
  libroSeleccionado!: IlisPrestado ;
  public ver: boolean = false; 
  public ver1: boolean = false; 
  
  constructor(private router: Router, private apiAlumno: ApiAlumnoService) { }

  ngOnInit() {
    this.apiAlumno.getBibloteca().subscribe(
      (data: IlisPrestado[]) => {
        this.listado = data;
        console.log('Libros obtenidos:', this.listado);
        
        // Iniciar un timer que actualice la cuenta regresiva cada segundo
        this.timerSubscription = timer(0, 1000).subscribe(() => {
          this.updateCountdown();
        });
      },
      error => {
        console.error('Error al obtener los libros', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  updateCountdown() {
    this.listado.forEach(prestado => {
      const fechaDevolucion = new Date(prestado.fecha_devolucion);
      const now = new Date();
      const timeRemaining = fechaDevolucion.getTime() - now.getTime();

      if (timeRemaining > 0) {
        const dias = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const horas = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        
        prestado.tiempo_restante = { hours: dias, minutes: horas, seconds: minutos };  // Ajustar la estructura de tiempo_restante
      } else {
        prestado.tiempo_restante = { hours: 0, minutes: 0, seconds: 0 };
      }
    });
  }

  regresar() {
    this.router.navigate(['/tabs/tab1']);
  }

  selecionarlibo(prestado: IlisPrestado) {
    this.libroSeleccionado = prestado;
    this.qrdata = `Libro: ${prestado.libro_nombre}, Usuario: ${prestado.usuario_nombre}, Fecha de préstamo: ${prestado.fecha_prestamo}`;
    console.log('Libro seleccionado:', this.libroSeleccionado);
    this.ver = true; // Cambia a true para mostrar el QR
    this.ver1 = true;
  }

  regresa1(){
    this.ver = false; // Cambia a true para mostrar el QR
    this.ver1 = false;
  }
}
