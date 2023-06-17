import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAdmin:boolean;
  constructor(private authService: AuthService) { 
    
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
  }

  async logOut(){
    await this.authService.logOut();
  }
}
