import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable } from "rxjs/Observable";


import { AuthService } from './login-component/auth.service';
import { routing } from './app.routing';
import { LoginComponentComponent } from './login-component/login-component.component';
//import { DataService } from './services/data-service';
import { Menu } from './models/menu';
import { AuthGuard } from './guards/auth.guard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})



export class AppComponent implements OnInit, OnDestroy {
  mostrarMenuUnsubscribe: any;
  title = 'app';
  
  mostraMenu: boolean = false;
  

  constructor(private authService: AuthService, private router: Router, private auth: AuthGuard){ }
  ngOnInit(){
    
    this.escreveTexto('DriveTruck', 'dt', 150 )
    
    this.mostrarMenuUnsubscribe = this.authService.mostraMenuEmitter.subscribe(
      mostrar => this.mostraMenu = mostrar
    );
    this.router.navigate(['/inicio']);
  } 

  ngOnDestroy(): void {
    this.mostrarMenuUnsubscribe.unsubscribe()
  }

  // encerra sessao de usuarios logados
  EncerrarSessao(){
    this.authService.fazerLoginLogout(null,null,null,null,'SAIR')
  }

  // faz o efeito do menu de digitacao...
  escreveTexto(texto,idElemento,tempo){
    var char = texto.split('').reverse();
    var typer = setInterval(function () {
        if (!char.length) return clearInterval(typer);
        var next = char.pop();
        document.getElementById(idElemento).innerHTML += next;
    }, tempo);
  }



}
