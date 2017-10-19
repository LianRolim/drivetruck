import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './../login-component/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  public menu: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    
    console.log(this.authService.autenticacao());

    if(this.authService.autenticacao()){
      //this.router.navigate(['/inicio']);
      this.menu = true;
      return true;
      
    }else{
       return false;
    }
        
  }

  constructor( private authService: AuthService, private router: Router ) { }
  
  }
