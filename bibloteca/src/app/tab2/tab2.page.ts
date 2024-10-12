import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  borrar: string = '';
  constructor(private router:Router) {}
  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
  usuario(){
    this.router.navigate(['/iniciar/usuario']);
  }
}
  