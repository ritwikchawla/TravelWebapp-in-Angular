import  {  Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ITrip } from '../models';
import { TripService } from '../services/trip.service';
import { first, delay } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})

export class UserTripsResolver implements Resolve<ITrip>{
    constructor(private tripService: TripService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.tripService.getUserTrips().pipe(first())
    }
}