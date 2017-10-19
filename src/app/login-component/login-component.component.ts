import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
//import { DataService } from './../services/data-service';
import { Menu } from './../models/menu';
import { Login } from './../models/Login';
import { User } from './../models/User';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit, OnDestroy {

  consultarLoginSubscribe: any;

  private user: any;
  private senha: any;
  private retorno: any;
  private msgErro: string;


  lsucess = false;

  constructor(private AuthService: AuthService, private router: Router, http: Http) { }

  ngOnInit() {
  
  }

  ngOnDestroy(): void {
    //this.consultarLoginSubscribe.unsubscribe()
  }

  fazerLogin(){

    this.consultarLoginSubscribe = this.AuthService.logar(this.user).subscribe(
                                   login => this.processarLogin(login),
                                   error => this.msgErro = error
                                  )
  }

  processarLogin(login: Login){
    console.log(login)
    if(this.AuthService.fazerLoginLogout(login[0].email, login[0].senha, this.user, this.senha, "ENTRAR")){
       //localStorage['token'] = login;
       localStorage.setItem('userLogado', login[0].idUsuario )

    }
  }

}