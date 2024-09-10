import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutRPIAComponent } from './about-rpia/about-rpia.component'

// TODO -- fill out all the routes and their protections
export const routes: Routes = 
[
  { path: 'home', component: HomeComponent },
  { path: 'about-rpia', component: AboutRPIAComponent },
  /*
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Authenticated users only
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },  // Admins only
  { path: 'login', component: LoginComponent },
   */
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule
({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
