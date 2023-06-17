import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-section',
  templateUrl: './reviews-section.component.html',
  styleUrls: ['./reviews-section.component.scss']
})
export class ReviewsSectionComponent implements OnInit {
  @Input('reviews') reviews:Object[];

  constructor() { }

  ngOnInit() {
  }
}
