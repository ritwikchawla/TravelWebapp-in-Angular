import  {  Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ITrip } from '../models';
import { TripService } from '../services/trip.service';
import { first, tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class SingleTripResolver implements Resolve<ITrip>{
    constructor(private tripService: TripService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const id=route.params.id;
        return this.tripService.getById(id).pipe(first());
    }
}