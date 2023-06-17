import { Component, OnInit } from '@angular/core';
import { TripService } from './../../../core/services/trip.service';
import { ITrip } from 'src/app/core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  isPreview: boolean;
  formData: ITrip;
  isVerified: boolean;

  constructor(
    private tripService: TripService,
    private toastrService: ToastrService
  ) {

    this.isVerified = false;
  }

  ngOnInit() {
  }

  formDataHandler(event) {
    this.formData = event;
  }

  submitFormHandler(event) {
    if (!this.isVerified) {
      this.toastrService.info("Don't forget to press 'Preview' to verify the last changes. To continue press 'Looks Good'again.", 'Tip');
      this.isVerified = true;
    } else {
      let tripData = { ...this.formData, authorId: localStorage.getItem('uid') };
      if (this.formData.places.length === 1 && this.formData.places[0].trim() === '') {
        tripData = { ...tripData, places: []}
      } 
      this.tripService.create(tripData);
    }
  }
}
