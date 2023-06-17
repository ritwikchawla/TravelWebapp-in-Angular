import { Component, OnInit } from '@angular/core';
import { FeaturedService } from './../../../core/services/featured.service';
import { IFeatured } from './../../../core/models/featured';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ITrip } from 'src/app/core/models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  isPreview: boolean;
  id:string;
  tripData: ITrip;
  formData: IFeatured;
  isVerified: boolean;

  constructor(
    private featuredService: FeaturedService,
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
      this.toastrService.info("Don't forget to press 'Preview' to verify the last changes. To continue press 'Looks Good'again.", 'Tip');
      this.isVerified = true;
    } else {
      let featuredData = { ...this.formData, reviews: [], likes:0}
      if (this.formData.places.length === 1 && this.formData.places[0].trim() === '') {
        featuredData = { ...this.formData, places: [] }
      }

      this.featuredService.create(featuredData);
    }
  }
}
