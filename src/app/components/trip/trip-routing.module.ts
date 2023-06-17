import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { UserTripsResolver } from 'src/app/core/resolvers/user-trips.resolver';
import { SingleTripResolver } from 'src/app/core/resolvers/single-trip.resolver';
import { PublicTripsResolver } from 'src/app/core/resolvers/public-trips.resolver';

const routes: Routes =[
  { path: "", pathMatch: "full", redirectTo: "mine" },
  {
    path:'create',
    component:CreateComponent,
  },
  {
    path:'edit/:id',
    component:EditComponent,
    resolve:{tripData: SingleTripResolver}
  },

  {
    path:'mine',
    component:TripListComponent,
    resolve:{tripsList: UserTripsResolver}
  },
  {
    path:'all',
    component:TripListComponent,
    resolve:{tripsList:PublicTripsResolver}
  },
  {
    path:'details/:id',
    component:TripDetailsComponent,
    resolve:{tripData: SingleTripResolver}
  },
];

@NgModule({
  imports: [
  RouterModule.forChild(routes)
],
  exports: [RouterModule],
  providers:[
    UserTripsResolver,
    SingleTripResolver,
    PublicTripsResolver
  ]
})

export class TripRoutingModule {} 
