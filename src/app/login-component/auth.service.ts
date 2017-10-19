import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response, Headers, Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Login } from './../models/Login';
import { Menu } from './../models/menu';
import { HttpUtilService } from './../services/http-util-service';
import { User } from './../models/User';


@Injectable()
export class AuthService {
  private loginUrl: string = 'usuario/email/';
  private logoutUrl: string = '';

  private usuarioAutenticado: boolean = false;

  public mostraMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService) {

  }


  fazerLoginLogout(userBanco: any,
    senhaBanco: any,
    userEntrada: any,
    senhaEntrada: any,
    acao: String) {


    if (acao == "ENTRAR") { // entrar
      if (userBanco == userEntrada && senhaBanco == senhaEntrada) {

        this.usuarioAutenticado = true;
        this.mostraMenuEmitter.emit(true);
        this.router.navigate(['/inicio']);
        return true;

      } else {

        alert('Usuario ou senha inválidos')
        this.usuarioAutenticado = false;
        this.mostraMenuEmitter.emit(false);
        return false;

      }
    } else { // sair 
      this.usuarioAutenticado = false;
      this.mostraMenuEmitter.emit(false);
      this.sair();
      this.router.navigate(['/login']);
      return false;
    }

  }

  autenticacao() { // retorna se o user esta autenticado
    return this.usuarioAutenticado;
  }

  // get no servico de login, buscando pelo user...
  logar(usuario: string): Observable<Login> {

    return this.http.get(this.httpUtil.url(this.loginUrl + usuario),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  sair() {
    delete localStorage['userLogado'];
  }

  logado() {
    return localStorage.getItem('userLogado');  
  }
}
