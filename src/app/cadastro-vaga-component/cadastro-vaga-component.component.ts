import { Requisitos } from './../models/Requisitos';
import { Atividades } from './../models/Atividades';
import { Beneficios } from './../models/Beneficios';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgProgressService } from 'ngx-progressbar';

import { Vagas } from './../models/Vagas';
import { HttpUtilService } from './../services/http-util-service';
import { AuthService } from './../login-component/auth.service';

@Component({
  selector: 'app-cadastro-vaga-component',
  templateUrl: './cadastro-vaga-component.component.html',
  styleUrls: ['./cadastro-vaga-component.component.css']
})
export class CadastroVagaComponentComponent implements OnInit, OnDestroy {
  path: string;


  constructor(private authService: AuthService,
    private router: Router, 
    private http: Http, 
    private httpUtil: HttpUtilService,
    public progressService: NgProgressService
  ) { }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    
  }

  //subscribes
  inserirVagaSubscribe: any;
  inserirAtividadesSubscribe: any;
  inserirBeneficiosSubscribe: any;
  inserirRequisitosSubscribe: any;

  private vaga: Vagas = new Vagas()
  private beneficio: Beneficios = new Beneficios()
  private atividades: Atividades = new Atividades()
  private requisitos: Requisitos = new Requisitos()

  arrAtividades = []
  arrBeneficios = []
  arrRequisitos = []

  addBeneficio(beneficio: String){
    if ( (!beneficio === null) || !(beneficio === "") ){    
       this.arrBeneficios.push(beneficio)
    }
  }

  addAtividade(atividade: String){
    if ( (!atividade === null) || !(atividade === "") ){    
       this.arrAtividades.push(atividade)
    }
  }

  addRequisito(requisito: String){
    if ( (!requisito === null) || !(requisito === "") ){    
       this.arrRequisitos.push(requisito)
    }
  }


  cadastrarVaga(){
    this.progressService.start()
    this.vaga.tbUsuarioIdUsuario = Number(this.authService.logado())

    this.inserirVagaSubscribe = this.inserirVaga(this.vaga)
    .subscribe( retInsVaga => {
                
                
                for(var i=0; i <= this.arrBeneficios.length-1; i++){ // percorre todos it adicionais
                   
                   var benef: Beneficios = new Beneficios()
                   
                   benef.nome = this.arrBeneficios[i]
                   benef.tbVagasIdVagas = retInsVaga

                   this.inserirBeneficiosSubscribe = this.inserirBeneficio(benef).subscribe( retInsBE => { })
                   
                }

                for(var i=0; i <= this.arrAtividades.length-1; i++){ // percorre todos it adicionais
                  
                  var atv: Atividades = new Atividades()
                  
                  atv.nome = this.arrAtividades[i]
                  atv.tbVagasIdVagas = retInsVaga

                  this.inserirAtividadesSubscribe = this.inserirAtividade(atv).subscribe( retInsATV => { })
                  
                }
                
                for(var i=0; i <= this.arrRequisitos.length-1; i++){ // percorre todos it adicionais
                  
                  var req: Requisitos = new Requisitos()
                  
                  req.nome = this.arrRequisitos[i]
                  req.tbVagasIdVagas = retInsVaga

                  this.inserirRequisitosSubscribe = this.inserirRequisito(req).subscribe( retInsATV => { })
                  
                }

                this.progressService.done()
                this.router.navigate(['/inicio'])

              })

  }

  inserirVaga(vaga: Vagas){

    this.path = 'vagas/cadastrarNovaVaga/'
    
    vaga.tbUsuarioIdUsuario = Number(this.authService.logado())
        
    let params = JSON.stringify(vaga)
        
    return this.http.post(this.httpUtil.url(this.path), params, 
                this.httpUtil.headers())
                    .map(this.httpUtil.extrairDados)
                    .catch(this.httpUtil.processarErros)

  }

  inserirBeneficio(bene: Beneficios){
    
        this.path = 'beneficios/'
            
        let params = JSON.stringify(bene)
            
        return this.http.post(this.httpUtil.url(this.path), params, 
                    this.httpUtil.headers())
                        .map(this.httpUtil.extrairDados)
                        .catch(this.httpUtil.processarErros)
    
  }

  inserirAtividade(ativ: Atividades){
    
        this.path = 'atividades/'
            
        let params = JSON.stringify(ativ)
            
        return this.http.post(this.httpUtil.url(this.path), params, 
                    this.httpUtil.headers())
                        .map(this.httpUtil.extrairDados)
                        .catch(this.httpUtil.processarErros)
    
  }

  inserirRequisito(requisito: Requisitos){
    
        this.path = 'requisitos/'
            
        let params = JSON.stringify(requisito)
            
        return this.http.post(this.httpUtil.url(this.path), params, 
                    this.httpUtil.headers())
                        .map(this.httpUtil.extrairDados)
                        .catch(this.httpUtil.processarErros)
    
  }


}
