import  {  Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IUser } from '../models';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class UserLoginResolver implements Resolve<IUser>{
    constructor(private authService: AuthService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.authService.user$.pipe(first())
    }
}
