import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Venda } from './../models/Venda';
import { Som } from './../models/Som';
import { Seguranca } from './../models/Seguranca';
import { FichaTecnica } from './../models/FichaTecnica';
import { Equipamentos } from './../models/Equipamentos';
import { Conforto } from './../models/Conforto';
import { Adicionais } from './../models/Adicionais';
import { HttpUtilService } from './../services/http-util-service';
import { User } from './../models/User';


@Component({
  selector: 'app-caminhao-venda-dtl-component',
  templateUrl: './caminhao-venda-dtl-component.component.html',
  styleUrls: ['./caminhao-venda-dtl-component.component.css']
})
export class CaminhaoVendaDtlComponentComponent implements OnInit, OnDestroy {
  msgErro: any;
  lAbreTela: boolean = false;

  carregarDadosCaminhaoVendaSUbscribe: any;
  carregarDadosAdicionaisSubscribe: any;
  carregarDadosEquipSubscribe: any;
  carregarDadosFichTecSubscribe: any;
  carregarDadosSegurancaSubscribe: any;
  carregarDadosSomSubscribe: any;
  carregarDadosConfortoSubscribe: any;
  carregarDadosUsuarioSubscribe: any;
  
  id: Number;

  dtlAdicionais: Adicionais;
  dtlConforto: Conforto;
  dtlEquipamento: Equipamentos
  dtlFichaTecnica: FichaTecnica
  dtlSeguranca: Seguranca
  dtlSom: Som
  dtlVendas: Venda
  dtlUsuario: User;

  constructor(private route: ActivatedRoute, 
              private http: Http,
              private httpUtil: HttpUtilService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.carregarDadosCaminhaoVenda(this.id)
    
  }

  ngOnDestroy(): void {
    this.carregarDadosCaminhaoVendaSUbscribe.unsubscribe()
    this.carregarDadosAdicionaisSubscribe.unsubscribe()
    this.carregarDadosEquipSubscribe.unsubscribe()
    this.carregarDadosFichTecSubscribe.unsubscribe()
    this.carregarDadosSegurancaSubscribe.unsubscribe()
    this.carregarDadosSomSubscribe.unsubscribe()
    this.carregarDadosConfortoSubscribe.unsubscribe()
    this.carregarDadosUsuarioSubscribe.unsubscribe()
  }

  carregarDadosCaminhaoVenda(id: Number){
      
    this.lAbreTela = false;

    this.carregarDadosCaminhaoVendaSUbscribe = this.consultarDadosVenda().subscribe(
      venda => { this.parseDadosVenda(venda) 
      
        this.carregarDadosUsuarioSubscribe = this.consultarDadosUsuario(venda.tbUsuarioIdUsuario).subscribe(
          usuario => { this.parseDadosUsuario(usuario) } ,
          error => this.msgErro = error
        )

      },
      error => this.msgErro = error
    )

    this.carregarDadosAdicionaisSubscribe = this.consultarDadosAdicionais().subscribe(
      adicionais => this.parseDadosAdicionais(adicionais),
      error => this.msgErro = error
    )

    this.carregarDadosConfortoSubscribe = this.consultarDadosConforto().subscribe(
      conforto => this.parseDadosConforto(conforto),
      error => this.msgErro = error
    )
    
    this.carregarDadosEquipSubscribe = this.consultarDadosEquipamento().subscribe(
      equipamento => this.parseDadosEquipamento(equipamento),
      error => this.msgErro = error
    )

    this.carregarDadosFichTecSubscribe = this.consultarDadosFichaTecnica().subscribe(
      fichaTecnica => {this.parseDadosFichaTecnica(fichaTecnica)
      },
      error => this.msgErro = error
    )

    this.carregarDadosSegurancaSubscribe = this.consultarDadosSeguranca().subscribe(
      seguranca => this.parseDadosSeguranca(seguranca),
      error => this.msgErro = error
    )

    this.carregarDadosSomSubscribe = this.consultarDadosSom().subscribe(
      som => { this.parseDadosSom(som) 
        this.lAbreTela = true
      } ,
      error => this.msgErro = error
    )

  }

  consultarDadosVenda(): Observable<Venda> {
    var path = 'vendas/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosVenda(dadosVenda: Venda){
    for(var i in dadosVenda){
      this.dtlVendas = dadosVenda  
   }
   console.log(this.dtlVendas)
  }

  consultarDadosAdicionais(): Observable<Adicionais> {
    var path = 'adicionais/findVenda/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosAdicionais(dadosAdicionais: Adicionais){
    for(var i in dadosAdicionais){
      this.dtlAdicionais = dadosAdicionais  
   }
   console.log(this.dtlAdicionais)
  }

  consultarDadosConforto(): Observable<Conforto> {
    var path = 'conforto/findByVenda/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosConforto(dadosConforto: Conforto){
    for(var i in dadosConforto){
      this.dtlConforto = dadosConforto  
   }
   console.log(this.dtlConforto)
  }

  consultarDadosEquipamento(): Observable<Equipamentos> {
    var path = 'equipamentos/findEqByVenda/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosEquipamento(dadosEquipamento: Equipamentos){
    for(var i in dadosEquipamento){
      this.dtlEquipamento = dadosEquipamento  
   }
   console.log(this.dtlEquipamento)
  }

  consultarDadosFichaTecnica(): Observable<FichaTecnica> {
    var path = 'fichaTecnica/findFTByVenda/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosFichaTecnica(dadosFichaTecnica: FichaTecnica){
    for(var i in dadosFichaTecnica){
      this.dtlFichaTecnica = dadosFichaTecnica  
   }
   console.log(this.dtlFichaTecnica[0].quilometros)
   console.log(this.dtlFichaTecnica[0].marcaMotor)
   console.log(this.dtlFichaTecnica)
  }

  consultarDadosSeguranca(): Observable<Seguranca> {
    var path = 'seguranca/findSGByVenda/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosSeguranca(dadosSeguranca: Seguranca){
    for(var i in dadosSeguranca){
      this.dtlSeguranca = dadosSeguranca  
   }
   console.log(this.dtlSeguranca)
  }

  consultarDadosSom(): Observable<Som> {
    var path = 'sistemaSom/findSomByVenda/'+ this.id

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosSom(dadosSom: Som){
    for(var i in dadosSom){
      this.dtlSom = dadosSom  
   }
   console.log(this.dtlSom)
  }


  consultarDadosUsuario(idUsuario: Number): Observable<User> {
    var path = 'usuario/'+ idUsuario

    return this.http.get(this.httpUtil.url(path),
      this.httpUtil.headers())
      .map(this.httpUtil.extrairDados);
  }

  parseDadosUsuario(dadosUsuario: User){
    for(var i in dadosUsuario){
      this.dtlUsuario = dadosUsuario  
   }
   console.log(this.dtlUsuario)
  }


}
