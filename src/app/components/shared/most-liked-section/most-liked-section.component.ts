import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeatured } from 'src/app/core/models';
import { FeaturedService } from 'src/app/core/services/featured.service';

@Component({
  selector: 'app-most-liked-section',
  templateUrl: './most-liked-section.component.html',
  styleUrls: ['./most-liked-section.component.scss']
})
export class MostLikedSectionComponent implements OnInit {
  mostLiked$:Observable<IFeatured[]>;

  constructor(private featuredService: FeaturedService) { }

  ngOnInit() {
    this.mostLiked$=this.featuredService.getMostLiked()
  }

}
