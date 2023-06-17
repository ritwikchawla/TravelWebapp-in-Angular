import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/core/services/trip.service';
import { ToastrService } from 'ngx-toastr';
import { ITrip } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isPreview: boolean;
  id: string;
  tripData:ITrip;
  formData: ITrip;
  isVerified: boolean;

  constructor(
    private tripService: TripService,
    private toastrService: ToastrService,
    private route:ActivatedRoute
  ) {

    this.isVerified = false;
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.id=id;
    const tripData = this.route.snapshot.data.tripData;
    this.tripData=tripData;
  }

  formDataHandler(event) {
    this.formData = event;
  }

  submitFormHandler(event) {
    if (!this.isVerified) {
      this.toastrService.info("Don't forget to press 'Preview'\n to verify the last changes. To continue press 'Looks Good'again.", 'Tip');
      this.isVerified = true;
    } else {

      let newTripData = { ...this.formData};
      if (this.formData.places.length === 1 && this.formData.places[0].trim() === '') {
        newTripData = { ...newTripData, places: []}
      }

      this.tripService.edit(this.id, newTripData);
    }
  }
}
