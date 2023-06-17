import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { ITrip } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  fromList: boolean;
  list:ITrip[];
  constructor(
    private tripService:TripService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    const tripsList = this.route.snapshot.data.tripsList;
    this.list=tripsList;
  }
}
