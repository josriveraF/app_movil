import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-re',
  templateUrl: './re.page.html',
  styleUrls: ['./re.page.scss'],
})
export class RePage implements OnInit {

  constructor(private router:Router) { }

  acceso(){
    this.router.navigate(['/iniciar/registro']);
  }
  ngOnInit() {
  }

}
