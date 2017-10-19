import { CadastroCaminhaoComponentComponent } from './cadastro-caminhao-component/cadastro-caminhao-component.component';
import { CadastroVagaComponentComponent } from './cadastro-vaga-component/cadastro-vaga-component.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaminhoesComponentComponent } from './caminhoes-component/caminhoes-component.component';
import { InicioComponentComponent } from './inicio-component/inicio-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RecuperarComponentComponent } from './recuperar-component/recuperar-component.component';
import { CadastroComponentComponent } from './cadastro-component/cadastro-component.component';
import { AuthGuard } from './guards/auth.guard';
import { LogoutComponentComponent } from './logout-component/logout-component.component';
import { AppComponent } from './app.component';
import { PerfilComponentComponent } from './perfil-component/perfil-component.component';
import { MensagemComponentComponent } from './mensagem-component/mensagem-component.component';
import { CaminhaoVendaDtlComponentComponent } from './caminhao-venda-dtl-component/caminhao-venda-dtl-component.component';

const APP_ROUTES: Routes = [
    
    { path: 'caminhoes', component: CaminhoesComponentComponent },
    { path: 'inicio', component: InicioComponentComponent },
    { path: 'login', component: LoginComponentComponent },
    { path: 'cadastro', component: CadastroComponentComponent },
    { path: 'recuperar_dados', component: RecuperarComponentComponent },
    { path: 'mensagem', canActivate: [AuthGuard], component: MensagemComponentComponent },
    { path: 'profile', canActivate: [AuthGuard], component: PerfilComponentComponent },
    { path: 'logout', canActivate: [AuthGuard], component: LogoutComponentComponent },
    { path: 'venda_detalhe/:id', component: CaminhaoVendaDtlComponentComponent },
    { path: 'cadastrar_vaga', canActivate: [AuthGuard], component: CadastroVagaComponentComponent },
    { path: 'cadastrar_anuncio', canActivate: [AuthGuard], component: CadastroCaminhaoComponentComponent },
    { path: '', component: AppComponent }
    

];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);