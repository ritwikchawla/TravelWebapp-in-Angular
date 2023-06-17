import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ITrip } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/core/services/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  id: string;
  tripData:ITrip;
  constructor(
    private route: ActivatedRoute,
    private tripService: TripService) { 
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.id=id;
    const tripData = this.route.snapshot.data.tripData;
    this.tripData=tripData;
  }

  deleteBtnHandler(event){
    this.tripService.delete(this.id);
  }
}
