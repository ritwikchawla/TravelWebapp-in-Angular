import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerHandler(form: NgForm) {
  // console.log(form)
    const { displayName, email, password } = form.value;
    return this.authService.emailPasswordRegistration(email, password, displayName);
  }
}
