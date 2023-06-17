import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TripRoutingModule } from './trip-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { FormComponent } from './shared/form/form.component';
import { CardComponent } from './shared/card/card.component';



import { TripService } from 'src/app/core/services/trip.service';

@NgModule({
  declarations: [
    CreateComponent, 
    EditComponent, 
    TripDetailsComponent, 
    TripListComponent,
    FormComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TripRoutingModule,
    SharedModule
  ],
  exports:[
  ],
  providers:[
    TripService,
  ]
})
export class TripModule { }
