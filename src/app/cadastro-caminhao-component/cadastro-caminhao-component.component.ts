import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { HttpUtilService } from './../services/http-util-service';
import { AuthService } from './../login-component/auth.service';
import { Som } from './../models/Som';
import { Seguranca } from './../models/Seguranca';
import { FichaTecnica } from './../models/FichaTecnica';
import { Equipamentos } from './../models/Equipamentos';
import { Conforto } from './../models/Conforto';
import { Adicionais } from './../models/Adicionais';
import { Venda } from './../models/Venda';
import { NgProgressService } from 'ngx-progressbar';
import { FileHolder } from 'angular2-image-upload';

@Component({
  selector: 'app-cadastro-caminhao-component',
  templateUrl: './cadastro-caminhao-component.component.html',
  styleUrls: ['./cadastro-caminhao-component.component.css']
})
export class CadastroCaminhaoComponentComponent implements OnInit, OnDestroy {
  
  //subscribes
  inserirVendaSubscribe: any;
  inserirFichaTecnicaSubscribe: any;
  inserirAdicionaisSubscribe: any;
  inserirSomSubscribe: any;
  inserirConfortoSubscribe: any;
  inserirEquipamentoSubscribe:any;
  progressSubscribe:any;

  image: any;
  msgErro: any;
  retorno: any;
  isLoading = false;

  private path = ''

  // instancio as classes necessárias
  private venda: Venda = new Venda()
  private adicionais: Adicionais = new Adicionais()
  private conforto: Conforto = new Conforto()
  private equipamentos: Equipamentos = new Equipamentos()
  private fichaTecnica: FichaTecnica = new FichaTecnica()
  private seguranca: Seguranca = new Seguranca()  
  private som: Som = new Som() 

  // variaveis de controle de quantos itens vão entrar...
  itemsSeguranca = [];
  itemsConforto = [];
  itemsSom = [];
  itemsAdicionais = [];
  arrImagens = [];
  mapImagens: Map<String, String>;

  limpaCampo = ""

  constructor(private authService: AuthService, 
    private router: Router, 
    private http: Http, 
    private httpUtil: HttpUtilService,
    public progressService: NgProgressService) { 
    //console.log(authService.logado())

  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    if(this.inserirVendaSubscribe){
      this.inserirVendaSubscribe.unsubscribe()
    }else if(this.inserirFichaTecnicaSubscribe){
      this.inserirFichaTecnicaSubscribe.unsubscribe()
    }else if(this.inserirAdicionaisSubscribe){
      this.inserirAdicionaisSubscribe.unsubscribe()
    }else if(this.inserirSomSubscribe){
      this.inserirSomSubscribe.unsubscribe()
    }else if(this.inserirConfortoSubscribe){
      this.inserirConfortoSubscribe.unsubscribe()
    }else if(this.inserirEquipamentoSubscribe){
      this.inserirEquipamentoSubscribe.unsubscribe()
    }else if (this.progressSubscribe){
      this.progressService.trickling.unsubscribe()
    }
  }

  addItemSeguranca(itemSeguranca: String){
    if ( (!itemSeguranca === null) || !(itemSeguranca === "") ){
       this.itemsSeguranca.push(itemSeguranca)
    }
  }
  
  addItemAdicional(equipamento: String){
    if ( (!equipamento === null) || !(equipamento === "") ){
       this.itemsAdicionais.push(equipamento)
    }
  }


  addItemConforto(conforto: String){
    if ( (!conforto === null) || !(conforto === "") ){    
       this.itemsConforto.push(conforto)
    }
  }

  addItemSom(som: String){
    if ( (!som === null) || !(som === "") ){    
       this.itemsSom.push(som)
    }
  }


  cadastrarNovoAnuncio(){
    this.cadastrarVenda()
  }

  cadastrarVenda(){
    this.progressSubscribe = this.progressService.start()
    this.isLoading = true

    this.fichaTecnica.tbVendasIdVendas = null
    
    // insere na tabela venda
    this.inserirVendaSubscribe = this.inserirVenda(this.venda)
        .subscribe( retInsVenda => {
                    this.fichaTecnica.tbVendasIdVendas = retInsVenda
                    this.adicionais.tbVendasIdVendas = retInsVenda
                    this.inserirFichaTecnicaSubscribe = this.inserirFichaTecnica(this.fichaTecnica).subscribe( retInsFT => { })
                    this.inserirAdicionaisSubscribe = this.inserirAdicionais(this.adicionais).subscribe( retInsAdc => { })

                    for(var i=0; i <= this.itemsAdicionais.length-1; i++){ // percorre todos it adicionais
                       
                       var novoEquipamento: Equipamentos = new Equipamentos()
                       
                       novoEquipamento.nome = this.itemsAdicionais[i]
                       novoEquipamento.tbVendasIdVendas = retInsVenda

                       this.inserirEquipamentoSubscribe = this.inserirEquipamentos(novoEquipamento).subscribe( retInsEQ => { })
                       
                    }

                    for(var i=0; i <= this.itemsSeguranca.length-1; i++){

                       var novoItemSeguranca: Seguranca = new Seguranca()

                       novoItemSeguranca.nome = this.itemsSeguranca[i]
                       novoItemSeguranca.tbVendasIdVendas = retInsVenda

                       this.inserirAdicionaisSubscribe = this.inserirItemSeguranca(novoItemSeguranca).subscribe( retInsSEG => { })

                    }

                    for(var i=0; i <= this.itemsConforto.length-1; i++){
                      
                       var novoItemConforto: Conforto = new Conforto()
                      
                       novoItemConforto.nome = this.itemsConforto[i]
                       novoItemConforto.tbVendasIdVendas = retInsVenda
                      
                       this.inserirConfortoSubscribe = this.inserirItemConforto(novoItemConforto).subscribe( retInsCO => { })
                      
                    }

                    for(var i=0; i <= this.itemsSom.length-1; i++){
                      
                       var novoItemSom: Som = new Som()
                      
                       novoItemSom.nome = this.itemsConforto[i]
                       novoItemSom.tbVendasIdVendas = retInsVenda
                      
                       this.inserirSomSubscribe = this.inserirItemSom(novoItemSom).subscribe( retInsSOM => { })
                      
                    }

                    this.progressService.done()
                    if (this.progressSubscribe){
                      this.progressService.trickling.unsubscribe()
                      this.progressService.trickling.closed = true
                    }
                    this.isLoading = false
                    this.router.navigate(['/caminhoes'])
                  })    
  } 

  inserirVenda(dtlVenda: Venda){

    dtlVenda.img01 = this.arrImagens[0];
    dtlVenda.img02 = this.arrImagens[1];
    dtlVenda.img03 = this.arrImagens[2];
    dtlVenda.img04 = this.arrImagens[3];
    dtlVenda.img05 = this.arrImagens[4];
    dtlVenda.img06 = this.arrImagens[5];
    dtlVenda.img07 = this.arrImagens[6];
    dtlVenda.img08 = this.arrImagens[7];
    dtlVenda.img09 = this.arrImagens[8];
    dtlVenda.img10 = this.arrImagens[9];

    this.path = 'vendas/createNovaVenda/'

    dtlVenda.tbUsuarioIdUsuario = Number(this.authService.logado())
    
    let params = JSON.stringify(dtlVenda)
    
    	return this.http.post(this.httpUtil.url(this.path), params, 
    					this.httpUtil.headers())
      				.map(this.httpUtil.extrairDados)
                  .catch(this.httpUtil.processarErros)

  }

  inserirFichaTecnica(dtlFichaTecnica: FichaTecnica){
    
        this.path = 'fichaTecnica'
        
        let params = JSON.stringify(dtlFichaTecnica)
        
          return this.http.post(this.httpUtil.url(this.path), params, 
                  this.httpUtil.headers())
                  .map(this.httpUtil.extrairDados)
                      .catch(this.httpUtil.processarErros)
    
  }

  inserirAdicionais(dtlAdicionais: Adicionais){
    
        this.path = 'adicionais'
        
        let params = JSON.stringify(dtlAdicionais)
        
          return this.http.post(this.httpUtil.url(this.path), params, 
                  this.httpUtil.headers())
                  .map(this.httpUtil.extrairDados)
                      .catch(this.httpUtil.processarErros)
    
  }

  inserirEquipamentos(dtlEquipamento: Equipamentos){
    
        this.path = 'equipamentos'
        
        let params = JSON.stringify(dtlEquipamento)
        
          return this.http.post(this.httpUtil.url(this.path), params, 
                  this.httpUtil.headers())
                  .map(this.httpUtil.extrairDados)
                      .catch(this.httpUtil.processarErros)
    
  }

  inserirItemSeguranca(dtlSeguranca: Seguranca){
    
        this.path = 'seguranca'
        
        let params = JSON.stringify(dtlSeguranca)
        
          return this.http.post(this.httpUtil.url(this.path), params, 
                  this.httpUtil.headers())
                  .map(this.httpUtil.extrairDados)
                      .catch(this.httpUtil.processarErros)
    
  }

  inserirItemConforto(dtlConforto: Conforto){
    
        this.path = 'conforto'
        
        let params = JSON.stringify(dtlConforto)
        
          return this.http.post(this.httpUtil.url(this.path), params, 
                  this.httpUtil.headers())
                  .map(this.httpUtil.extrairDados)
                      .catch(this.httpUtil.processarErros)
    
  }

  inserirItemSom(dtlSom: Som){
    
        this.path = 'sistemaSom'
        
        let params = JSON.stringify(dtlSom)
        
          return this.http.post(this.httpUtil.url(this.path), params, 
                  this.httpUtil.headers())
                  .map(this.httpUtil.extrairDados)
                      .catch(this.httpUtil.processarErros)
    
  }

  //upload das imagens
  imageFinishedUploading(file: FileHolder) {
    this.arrImagens.push(file.src);
  }
  
  onRemoved(file: FileHolder) {
    this.arrImagens.splice(this.arrImagens.indexOf(file.src))
  }
  
  onUploadStateChanged(state: boolean) {
    console.log(JSON.stringify(state));
  }

  changeListener($event) : void {
    this.readThis($event.target)
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader()
  
    myReader.onloadend = (e) => {
      this.image = myReader.result
    }
    myReader.readAsDataURL(file)
  }

}