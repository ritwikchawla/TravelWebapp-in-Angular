import { Component, OnInit } from '@angular/core';
import { IFeatured } from './../../../core/models/featured';
import { FeaturedService } from './../../../core/services/featured.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  fromList: boolean;
  list$:Observable<IFeatured[]>;
  constructor(
    private featuredService:FeaturedService,
    ) { }

  ngOnInit() {
    this.list$=this.featuredService.getAll();
  }
}
