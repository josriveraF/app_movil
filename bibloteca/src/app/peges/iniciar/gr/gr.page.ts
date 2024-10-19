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

  constructor(private router: Router, private apiAlumno: ApiAlumnoService) {this.qrdata}

  ngOnInit() {
    this.apiAlumno.getBibloteca().subscribe(
      (data: IlisPrestado[]) => {
        this.listado = data;
        console.log('Libros obtenidos:', this.listado); // Imprime los libros en la consola
        
        // Convertimos el listado a JSON para el QR
        if (this.listado.length > 0) {
          this.qrdata = JSON.stringify(this.listado[0]); // Generar QR del primer libro
        }
        

        // Iniciar un timer que actualice la cuenta regresiva cada segundo
        this.timerSubscription = timer(0, 1000).subscribe(() => {
          this.updateCountdown();
        });
      },
      error => {
        console.error('Error al obtener los libros', error); // Muestra el error en la consola
      }
    );
  }

  ngOnDestroy() {
    // Limpiar la suscripción al destruir el componente al llegar a 0  no sigue la cuenta
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
// lo copie nose como funciona realmente profesora aqui me cai sorry
  updateCountdown() {
    this.listado.forEach(prestado => {
      const fechaDevolucion = new Date(prestado.fecha_devolucion);
      const now = new Date();
      const timeRemaining = fechaDevolucion.getTime() - now.getTime();

      if (timeRemaining > 0) {
        const dias = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const horas = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        
        prestado.tiempo_restante.hours = dias;
        prestado.tiempo_restante.minutes = horas;
        prestado.tiempo_restante.seconds = minutos;
       
      } else {
        // Maneja el caso en que el tiempo se haya agotado
   
        prestado.tiempo_restante.hours = 0;
        prestado.tiempo_restante.minutes = 0;
        prestado.tiempo_restante.seconds = 0;
       
      }
    });
  }

  regresar() {
    this.router.navigate(['/tabs/tab1']);
  }
}

