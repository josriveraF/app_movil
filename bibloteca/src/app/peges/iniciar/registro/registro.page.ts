import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  isLoginVisible: boolean = true;

  constructor(private router:Router) { }
  // hace visible otros card 
  showolvido() {
    this.isLoginVisible = false;
  }

  // Método para mostrar la vista de login
  showregresar() {
    this.isLoginVisible = true;
  }

  
  ngOnInit() {
  }
 
  
  inicio(){
    this.router.navigate(['/tabs/tab1']);
  }

}
