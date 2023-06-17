import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router, 
    CanLoad,
    Route,
    UrlSegment
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { AuthService } from '../services/auth.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class AuthLoadGuard implements CanLoad {
    constructor(
      private authService: AuthService,
      private router: Router
    ) { }
  
    canLoad(route: Route, segments: UrlSegment[]){
        if (this.authService.isAuth) {
            return true;
          }
      
          this.router.navigate([ '/login' ]);
          return false;
    }
  } 