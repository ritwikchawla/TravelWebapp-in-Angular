import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FeaturedService } from 'src/app/core/services/featured.service';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './shared/card/card.component';
import { FormComponent } from './shared/form/form.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    CreateComponent, 
    DetailsComponent, 
    ListComponent, 
    CardComponent, 
    FormComponent, ReviewComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[
  ],
  providers:[FeaturedService]
})
export class FeaturedModule { }
