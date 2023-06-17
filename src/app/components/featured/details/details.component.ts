import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IFeatured } from './../../../core/models/featured';
import { FeaturedService } from './../../../core/services/featured.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  fromDetails:boolean;
  id: string;
  featuredData:IFeatured;
  isLiked:boolean;
  showReview:boolean;
  formatterReviews;

  constructor(
    private route: ActivatedRoute,
    private featuredService: FeaturedService,
    private toastrService: ToastrService
    ) { 
  }

  ngOnInit() {
      this.route.params.subscribe((params: Params)=>{
        this.id = params.id
      });

      this.route.data.subscribe((data)=>{
        this.featuredData=data.featuredData;
      });
  }

  buttonClickHandler(event){
    if(event==='favorite'){
      this.featuredData.likes  = this.featuredData.likes + 1;
      this.featuredService.edit(this.id, {likes:this.featuredData.likes});
      this.toastrService.success(`Thank you for your like!`, 'Success');
      this.isLiked = true;
    }else if (event==='Review'){
      this.showReview=true;
    }else if (event==="Hide Review"){
      this.showReview=false;
    }
  }

  handleReview(event){
    this.showReview=false;
    this.featuredData.reviews = [...this.featuredData.reviews, {name:localStorage.getItem('displayName'), message:event}];
    this.featuredService.edit(this.id,{reviews:this.featuredData.reviews});
    this.toastrService.success('Your opinion matters to us!', 'Thank you')
  }
}
