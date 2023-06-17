import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFeatured } from 'src/app/core/models';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input('showReview') showReview:boolean;
  @Input('featuredData') featuredData:IFeatured;
  @Output('clickReviewEmitter') clickReviewEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  reviewHandler(form:NgForm){
    this.clickReviewEmitter.emit(form.value.review)
  }
}
