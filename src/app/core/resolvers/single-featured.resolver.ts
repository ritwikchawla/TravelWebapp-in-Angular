import  {  Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IFeatured } from '../models';
import { FeaturedService } from '../services/featured.service';
import { first, tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class SingleFeaturedResolver implements Resolve<IFeatured>{
    constructor(private featuredService: FeaturedService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const id=route.params.id;
        return this.featuredService.getById(id).pipe(first());
    }
}