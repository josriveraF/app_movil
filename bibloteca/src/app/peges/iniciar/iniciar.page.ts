import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Método para navegar a la página de login
  login() {
    this.router.navigate(['/login']);
  }

  // Método para navegar a la página de home
  registro() {
    this.router.navigate(['/registro']);
  }
}

