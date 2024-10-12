import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  borrar: string = '';
  constructor(private router:Router) {}
  regresar(){
    this.router.navigate(['/tabs/tab1']);
  }
}
