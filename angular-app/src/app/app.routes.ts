import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, CanActivateFn, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutRPIAComponent } from './about-rpia/about-rpia.component'
import { KeycloakService } from 'keycloak-angular';
import { CrewScheduleComponent } from './crew-schedule/crew-schedule.component';

// Authentication guard protects the below routes
export const authGuard: CanActivateFn = async (route, state) => 
{
  const keycloak = inject(KeycloakService);
  try 
  {
    const isAuthenticated = await keycloak.isLoggedIn();
    if (!isAuthenticated) 
    {
      keycloak.login({ redirectUri: state.url });
      return false;
    }
    return true;
  } catch (error)
  {
    console.error('Error checking Keycloak Auth: ', error)
    return false;
  }
};

// All website routes and their protections
export const routes: Routes = 
[
  { path: 'home', component: HomeComponent },
  { path: 'about-rpia', component: AboutRPIAComponent },
  { path: 'crew-schedule', component: CrewScheduleComponent, canActivate: [authGuard]},
  /*
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Authenticated users only
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },  // Admins only
  { path: 'login', component: LoginComponent },
   */
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

// Export the app routing module
@NgModule
({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
