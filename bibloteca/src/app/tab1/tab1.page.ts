import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(private router:Router) {}
  usuario(){
    this.router.navigate(['/iniciar/usuario']);
  }
  biblotecaentrega(){
    this.router.navigate(['/tabs/tab3']);
  }
  qr(){
    this.router.navigate(['/iniciar/gr']);
  }
  mibiblo(){
    this.router.navigate(['/iniciar/mibibloteca']);
  }
  Solicitud(){
    this.router.navigate(['/iniciar/solicitud']);
  }
}
