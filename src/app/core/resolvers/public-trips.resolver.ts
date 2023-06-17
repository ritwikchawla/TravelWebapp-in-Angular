import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ITrip } from '../models';
import { TripService } from '../services/trip.service';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class PublicTripsResolver implements Resolve<any>{
    constructor(private tripService: TripService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.tripService.getPublicTrips().pipe(first())
    }

}