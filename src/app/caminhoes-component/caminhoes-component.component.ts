import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './../services/http-util-service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Caminhoes } from './../models/Caminhoes';
@Component({
  selector: 'app-caminhoes-component',
  templateUrl: './caminhoes-component.component.html',
  styleUrls: ['./caminhoes-component.component.css']
})
export class CaminhoesComponentComponent implements OnInit, OnDestroy {
  
  msgErro: any;
  listCaminhoes: Caminhoes;
  carregarDadosCaminhaoSUbscribe: any;

  constructor(private router: Router,
              private http: Http,
              private httpUtil: HttpUtilService) { }

  ngOnInit() {
    
    this.carregaDadosCaminhoesVenda()

  }

  ngOnDestroy(): void {
    this.carregarDadosCaminhaoSUbscribe.unsubscribe()
  }

  onKey(event: KeyboardEvent) {
    if(event.code == "Enter"){
      console.log("sim")
    }
  }

  carregaDadosCaminhoesVenda(){
      this.carregarDadosCaminhaoSUbscribe = this.consultarDados().subscribe(
                                            caminhoes => this.parseDados(caminhoes),
                                            error => this.msgErro = error
                                            )
  }
  

  consultarDados(): Observable<Caminhoes> {
        var path = 'vendas/listCaminhoes'

        return this.http.get(this.httpUtil.url(path),
          this.httpUtil.headers())
          .map(this.httpUtil.extrairDados);
  }

  parseDados(caminhoes: Caminhoes){
    
     for(var i in caminhoes){
        this.listCaminhoes = caminhoes  
     }

     console.log(this.listCaminhoes)
  }


}
