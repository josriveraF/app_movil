import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gr',
  templateUrl: './gr.page.html',
  styleUrls: ['./gr.page.scss'],
})
export class GrPage implements OnInit {
  
  constructor(private router:Router) { }
  
  
  ngOnInit() {
  }
  regresar(){
    this.router.navigate(['/tabs/tab1']);}
  
}
