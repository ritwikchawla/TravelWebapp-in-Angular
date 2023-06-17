import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { UserLoginResolver } from './core/resolvers/user-login.resolver';
import { AuthLoadGuard } from './core/guards/auth.load.guard';
import { AuthGuard } from './core/guards/auth.guarg';
import { FeaturedModule } from './components/featured/featured.module';
import { ListComponent } from './components/featured/list/list.component';
import { CreateComponent } from './components/featured/create/create.component';
import { DetailsComponent } from './components/featured/details/details.component';
import { SingleTripResolver } from './core/resolvers/single-trip.resolver';
import { AdminGuard } from './core/guards/admin.guard';
import { SingleFeaturedResolver } from './core/resolvers/single-featured.resolver';


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "user/home" },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "user/home",
    component: HomeComponent,
    resolve: { user: UserLoginResolver },
    canActivate: [AuthGuard]
  },

  {
    path: "trip",
    loadChildren: "../app/components/trip/trip.module#TripModule",
    canLoad: [AuthLoadGuard]
  },

  {
    path: 'featured', children: [
      { 
        path: 'all', 
        component: ListComponent,
       },
      { 
        path: 'create/:id', 
        component: CreateComponent,
        canActivate: [AdminGuard],
        resolve:{tripData: SingleTripResolver},
      },
      { 
        path: 'details/:id', 
        component: DetailsComponent,
        resolve:{featuredData: SingleFeaturedResolver},
       },
    ],
    canActivate: [AuthGuard]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationModule,
    FeaturedModule,
  ],
  exports: [RouterModule],
  providers: [
    UserLoginResolver,
    AuthLoadGuard,
    AuthGuard,
    AdminGuard
  ]
})
export class AppRoutingModule { }
