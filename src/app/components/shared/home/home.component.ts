import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:IUser;
  // user$:Observable<IUser>;
  constructor(
    private authService:AuthService,
    private route: ActivatedRoute,
    ) {
  }
  
 ngOnInit() {
      // this.user$=this.authService.user$;
      const url = this.route.snapshot.routeConfig.path;
      if(url.includes('user')){
        let userData = this.route.snapshot.data.user;
        this.user= userData;
      }
    }
}
