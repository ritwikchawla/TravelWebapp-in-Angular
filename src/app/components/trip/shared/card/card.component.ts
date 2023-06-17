import { Component, OnInit, Input, Output, EventEmitter, Renderer2} from '@angular/core';
import { ITrip } from 'src/app/core/models';
import { AuthService } from './../../../../core/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input('fromDetails') fromDetails:boolean;
  @Input('isPreview') isPreview:boolean;
  @Input('fromList') fromList:boolean;

  @Input('formData') formData:ITrip;
  @Input('tripData') tripData:ITrip;
  @Output('clickButtonEmitter') clickButtonEmitter = new EventEmitter<any>();
  isAdmin: boolean;

  constructor(private authService: AuthService) { 
    this.isAdmin=this.authService.isAdmin;
  }

  ngOnInit() {
    
  }

  clickHandler(event){
    const btnText = event.target.innerText;
      this.clickButtonEmitter.emit(btnText);
  }
}
