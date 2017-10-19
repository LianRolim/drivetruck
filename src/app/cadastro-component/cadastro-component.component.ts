import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { User } from './../models/User';
import { AuthService } from './../login-component/auth.service';
import { HttpUtilService } from './../services/http-util-service';

@Component({
  selector: 'app-cadastro-component',
  templateUrl: './cadastro-component.component.html',
  styleUrls: ['./cadastro-component.component.css']
})
export class CadastroComponentComponent implements OnInit, OnDestroy {

  cadastrarSubscribe: any;

  image: any
  
  private cadastro: User = new User()
  private novoUser: User
  private tpPess: String
  private imagem: any

  private path = 'usuario/'
  
  constructor(private AuthService: AuthService, private router: Router, private http: Http, private httpUtil: HttpUtilService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if(this.cadastrarSubscribe){
      this.cadastrarSubscribe.unsubscribe()
    }
  }

  cadastrarNovoUsuario(){
    
     //this.cadastro.fotoPerfil = btoa(this.cadastro.fotoPerfil)
     this.cadastrarSubscribe = this.cadastrar(this.cadastro).subscribe( cad => { })
     alert('Cadastro Realizado com sucesso')
     this.router.navigate(['/login'])
     //console.log(btoa(this.cadastro.fotoPerfil))
  }



  cadastrar(usuario: User): Observable<User> {
    
    usuario.fotoPerfil = this.cadastro.fotoPerfil

    if (usuario.dataNascimento != null) { // soh converte se a data nao for vazia
       usuario.dataNascimento = new Date(usuario.dataNascimento)
    }
    usuario.email = usuario.email.toLowerCase()
    /*if (this.tpPess == "Fisica") {
      usuario.primeiroNome = usuario.primeiroNome.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      usuario.segundoNome = usuario.segundoNome.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      //usuario.tpoCnh = usuario.tpoCnh.toUpperCase()
    }else{
      usuario.segundoNome = usuario.segundoNome.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
      usuario.nomeEmpresa = usuario.nomeEmpresa.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }*/
    
   let params = JSON.stringify(usuario)
    
    	return this.http.post(this.httpUtil.url(this.path), params, 
    					this.httpUtil.headers())
      				.map(this.httpUtil.extrairDados)
                  .catch(this.httpUtil.processarErros)
                  
  }

  changeListener($event) : void {
    this.readThis($event.target)
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader()
  
    myReader.onloadend = (e) => {
      this.image = myReader.result
      this.cadastro.fotoPerfil = myReader.result
    }
    myReader.readAsDataURL(file)
  }
  
}
