import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

//import { DataService } from './../services/data-service';
import { Menu } from './../models/menu';

@Component({
  selector: 'app-logout-component',
  templateUrl: './logout-component.component.html',
  styleUrls: ['./logout-component.component.css']
})
export class LogoutComponentComponent implements OnInit {
  public menu: Menu;
  
  //constructor(private router: Router, private data: DataService) { }
  constructor(private router: Router) { }
  
  ngOnInit() {
    /*this.data.currentMessage.subscribe(controlMenu => this.menu = controlMenu);
    this.menu.mostrarMenu = false;
    this.data.changeMessage(this.menu);
    this.router.navigate(['/login']);*/
  }

  

}
