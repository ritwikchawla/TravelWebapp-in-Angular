import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from './authentication.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AnonimusGuard } from 'src/app/core/guards/anonimus.guard';
import { NgModule } from '@angular/core';


const routes: Routes = [
      // { path: "", pathMatch: "full", redirectTo: "/register" },
      { 
        path: "register", 
        component:AuthenticationComponent,
        children:[
          { path:"", pathMatch:"full", component:RegisterComponent },
        ],
        canActivate:[AnonimusGuard]
      },
      { 
        path: "login", 
        component:AuthenticationComponent,
        children:[
          { path:"", pathMatch:"full", component:LoginComponent },
        ],
         canActivate:[AnonimusGuard]
      }, 
    ]

    @NgModule({
      imports: [
      RouterModule.forChild(routes),
    ],
      exports: [RouterModule],
      providers:[
        AnonimusGuard
      ]
    })
    export class AuthenticationRouterModule{}