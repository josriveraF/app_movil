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

  constructor(private router:Router , private apiUser: ApiUserService)  {}
ngOnInit(): void {
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




  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
}
