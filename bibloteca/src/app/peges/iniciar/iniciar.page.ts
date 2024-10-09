import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.page.html',
  styleUrls: ['./iniciar.page.scss'],
})
export class IniciarPage implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }
login(){
  this.router.navigate(['/iniciar/registro']);
}
registro(){
  this.router.navigate(['/iniciar/re']);
}

}
