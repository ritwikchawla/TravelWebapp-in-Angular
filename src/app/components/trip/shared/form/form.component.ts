import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITrip } from 'src/app/core/models';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input('tripData') tripData: ITrip;
  @Output('formDataEmitter') formDataEmitter = new EventEmitter<any>();
  
  form: FormGroup; 
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if(this.tripData){
      //Default values for edit form
      this.form = this.fb.group({
        destination:[this.tripData.destination,Validators.required],
        startDate: [this.tripData.startDate,Validators.required],
        endDate: [this.tripData.endDate,Validators.required],
        private:[this.tripData.private],
        places:[this.tripData.places.join(', ')],
        image:[this.tripData.image, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)],
      });
    }else{
      //Default values for create form
      this.form = this.fb.group({
        destination:['',Validators.required],
        startDate: ['',Validators.required],
        endDate: ['',Validators.required],
        private:[false],
        places:[''],
        image:['', Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)],
      });
    }
  }
  
  get f (){
    return this.form.controls;
  }
  submitHandler(){
    this.formDataEmitter.emit({ 
      destination:this.f.destination.value.trim(),
      startDate: this.f.startDate.value,
      endDate: this.f.endDate.value,
      private:this.f.private.value,
      places:this.f.places.value.split(/\s*,\s*/),
      image:this.f.image.value.trim(),
    })
  }
}
