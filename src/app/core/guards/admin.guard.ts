import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router 
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { AuthService } from '../services/auth.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
    constructor(
      private authService: AuthService,
      private router: Router
    ) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.authService.isAdmin) {
        return true;
      }
  
      this.router.navigate([ '/user/home' ]);
      return false;
  }
} 