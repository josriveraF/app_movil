import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mibibloteca',
  templateUrl: './mibibloteca.page.html',
  styleUrls: ['./mibibloteca.page.scss'],
})
export class MibiblotecaPage implements OnInit {
  inagregar:boolean=true;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
  invisible(){
    this.inagregar=false
  }
  inivisible(){
    this.inagregar=true
  }
}
