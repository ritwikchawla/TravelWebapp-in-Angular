import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITrip } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      this.form = this.fb.group({
        destination:[this.tripData.destination,Validators.required],
        story:['',[Validators.required, Validators.minLength(95), Validators.maxLength(1000)]],
        places:[this.tripData.places.join(', ')],
        image:[this.tripData.image, Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]
      });
  }
  
  get f (){
    return this.form.controls;
  }
  
  submitHandler(){  
    this.formDataEmitter.emit({ 
      destination:this.f.destination.value.trim(),
      story: this.f.story.value,
      places:this.f.places.value.split(/\s*,\s*/),
      image:this.f.image.value.trim(),
    })
  }
}
