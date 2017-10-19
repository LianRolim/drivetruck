import { ActivatedRouteSnapshot } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Jsonp, JsonpModule } from '@angular/http';

import { ImageUploadModule } from 'angular2-image-upload';
import { CollapseModule } from 'ngx-bootstrap';
import { NgProgressModule } from 'ngx-progressbar';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { InicioComponentComponent } from './inicio-component/inicio-component.component';
import { CaminhoesComponentComponent } from './caminhoes-component/caminhoes-component.component';
import { routing } from './app.routing';
import { AuthService } from './login-component/auth.service';
import { CadastroComponentComponent } from './cadastro-component/cadastro-component.component';
import { RecuperarComponentComponent } from './recuperar-component/recuperar-component.component';
import { PerfilComponentComponent } from './perfil-component/perfil-component.component';
import { MensagemComponentComponent } from './mensagem-component/mensagem-component.component';
//import { DataService } from './services/data-service';
import { LogoutComponentComponent } from './logout-component/logout-component.component';
import { CaminhaoVendaDtlComponentComponent } from './caminhao-venda-dtl-component/caminhao-venda-dtl-component.component';
import { HttpUtilService } from './services/http-util-service';
import { CadastroVagaComponentComponent } from './cadastro-vaga-component/cadastro-vaga-component.component';
import { CadastroCaminhaoComponentComponent } from './cadastro-caminhao-component/cadastro-caminhao-component.component';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    InicioComponentComponent,
    CaminhoesComponentComponent,
    CadastroComponentComponent,
    RecuperarComponentComponent,
    PerfilComponentComponent,
    MensagemComponentComponent,
    LogoutComponentComponent,
    CaminhaoVendaDtlComponentComponent,
    CadastroVagaComponentComponent,
    CadastroCaminhaoComponentComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule, 
    BrowserModule,
    CollapseModule,
    HttpModule,
    JsonpModule,
    FileUploaderModule,
    NgProgressModule,
    ImageUploadModule.forRoot()
  ],
  //providers: [AuthService, DataService, AuthGuard],
  providers: [AuthService, AuthGuard, HttpUtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
