import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes, CanActivateFn, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutRPIAComponent } from './static-pages/public/about-rpia/about-rpia.component'
import { KeycloakService } from 'keycloak-angular';
import { CrewScheduleComponent } from './crew-schedule/crew-schedule.component';
import { EventScheduleComponent } from './event-schedule/event-schedule.component';
import { OfficersComponent } from './static-pages/public/officers/officers.component';
import { FaqComponent } from './static-pages/public/faq/faq.component';
import { ApparatusComponent } from './static-pages/public/apparatus/apparatus.component';
import { JoinUsComponent } from './static-pages/public/join-us/join-us.component';
import { NewMembersComponent } from './static-pages/public/new-members/new-members.component';
import { CprCertificationComponent } from './static-pages/public/cpr-certification/cpr-certification.component';
import { OutreachComponent } from './static-pages/public/outreach/outreach.component';
import { RequestCoverageComponent } from './static-pages/public/request-coverage/request-coverage.component';
import { ContactUsComponent } from './static-pages/public/contact-us/contact-us.component';
import { FuelLogComponent } from './dynamic-pages/members/fuel-log/fuel-log.component';
import { GrievanceReportComponent } from './static-pages/members/grievance-report/grievance-report.component';
import { StockingIssueComponent } from './static-pages/members/stocking-issue/stocking-issue.component';

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

// Admin guard protects admin routes
export const adminGuard: CanActivateFn = async (route, state) =>
{
  const keycloak = inject(KeycloakService);
  try
  {
    const isAdmin = await keycloak.isUserInRole('website-admin');
    if(!isAdmin)
    {
      return false;
    }
    return true;
  }
  catch(error)
  {
    console.error('Error checking Keycloak admin auth: ', error)
    return false;
  }
}

// All website routes and their protections
export const routes: Routes = 
[
  { path: 'home', component: HomeComponent },
  { path: 'about-rpia', component: AboutRPIAComponent },
  { path: 'faqs', component: FaqComponent },
  { path: 'officers', component: OfficersComponent },
  { path: 'apparatus', component: ApparatusComponent },
  { path: 'join', component: JoinUsComponent },
  { path: 'new-members', component: NewMembersComponent },
  { path: 'cpr-certification', component: CprCertificationComponent },
  { path: 'outreach', component: OutreachComponent },
  { path: 'request-coverage', component: RequestCoverageComponent },
  { path: 'contact-us', component: ContactUsComponent },

  { path: 'crew-schedule', component: CrewScheduleComponent, canActivate: [authGuard]},
  { path: 'event-schedule', component: EventScheduleComponent, canActivate: [authGuard]},
  { path: 'fuel-log', component: FuelLogComponent, canActivate: [authGuard]},
  { path: 'grievance-form', component: GrievanceReportComponent, canActivate: [authGuard]},
  { path: 'stocking-issue', component: StockingIssueComponent, canActivate: [authGuard]},
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
