import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
}
