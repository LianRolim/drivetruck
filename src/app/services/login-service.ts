import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Login } from '../models/Login';
import { HttpUtilService } from './http-util-service';



@Injectable()
export class LoginService {

	private loginUrl:string = 'driveTruckService/email/';
	private logoutUrl:string = '';

	constructor(private http: Http, private httpUtil: HttpUtilService) {
	}

	logar(usuario:string): Observable<Login> {
		let params = JSON.stringify(
			{ "username": usuario });
		
		return this.http.post(this.httpUtil.url(this.loginUrl), params, 
						this.httpUtil.headers())
	                .map(this.httpUtil.extrairDados);
	}

	sair() {
		
		delete localStorage['token'];
	}

	logado() {
		return localStorage['token'];
	}
}