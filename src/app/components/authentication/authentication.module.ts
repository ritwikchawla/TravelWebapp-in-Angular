import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRouterModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './../../core/services/auth.service';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRouterModule,
    FormsModule,
  ],
  providers: [AuthService],
})
export class AuthenticationModule { }