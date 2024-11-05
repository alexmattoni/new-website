import { NgModule, inject, OnInit, Component } from '@angular/core';
import { RouterModule, Routes, CanActivateFn, NavigationEnd, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutRPIAComponent } from './static-pages/public/about-rpia/about-rpia.component'
import { KeycloakService } from 'keycloak-angular';
import { CrewScheduleComponent } from './dynamic-pages/members/crew-schedule/crew-schedule.component';
import { EventScheduleComponent } from './dynamic-pages/members/event-schedule/event-schedule.component';
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
import { TrainingAttendantComponent } from './static-pages/members/training-attendant/training-attendant.component';
import { TrainingDriverComponent } from './static-pages/members/training-driver/training-driver.component';
import { TrainingCrewChiefComponent } from './static-pages/members/training-crew-chief/training-crew-chief.component';
import { TrainingDutySupervisorComponent } from './static-pages/members/training-duty-supervisor/training-duty-supervisor.component';
import { TrainingInServicesComponent } from './static-pages/members/training-in-services/training-in-services.component';
import { BylawsComponent } from './static-pages/members/bylaws/bylaws.component';
import { ConstitutionComponent } from './static-pages/members/constitution/constitution.component';
import { StandardOperatingGuidelinesComponent } from './static-pages/members/standard-operating-guidelines/standard-operating-guidelines.component';
import { FormsComponent } from './static-pages/members/forms/forms.component';
import { RadioCallsignsComponent } from './static-pages/members/radio-callsigns/radio-callsigns.component';
import { DepartmentOfHealthResourcesComponent } from './static-pages/members/department-of-health-resources/department-of-health-resources.component';
import { directus } from '../directus';

// Authentication guard protects member routes
export const authGuard: CanActivateFn = async (route, state) => 
{
  const keycloak = inject(KeycloakService);
  try 
  {
    // Check if logged in, otherwise redirect the user to do so
    const isAuthenticated = await keycloak.isLoggedIn();
    if (!isAuthenticated) 
    {
      keycloak.login({ redirectUri: state.url });
      return false;
    }

    // Since this guard triggers when trying to access authenticated routes,
    // this is a convenient time to check Directus authentication
    directus;

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
  // Public facing side
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

  // Member facing side
  { path: 'crew-schedule', component: CrewScheduleComponent, canActivate: [authGuard]},
  { path: 'event-schedule', component: EventScheduleComponent, canActivate: [authGuard]},
  { path: 'fuel-log', component: FuelLogComponent, canActivate: [authGuard]},
  { path: 'grievance-form', component: GrievanceReportComponent, canActivate: [authGuard]},
  { path: 'stocking-issue', component: StockingIssueComponent, canActivate: [authGuard]},
  { path: 'training-attendant', component: TrainingAttendantComponent, canActivate: [authGuard]},
  { path: 'training-driver', component: TrainingDriverComponent, canActivate: [authGuard]},
  { path: 'training-crewchief', component: TrainingCrewChiefComponent, canActivate: [authGuard]},
  { path: 'training-dutysupervisor', component: TrainingDutySupervisorComponent, canActivate: [authGuard]},
  { path: 'training-inservices', component: TrainingInServicesComponent, canActivate: [authGuard]},
  { path: 'bylaws', component: BylawsComponent, canActivate: [authGuard]},
  { path: 'constitution', component: ConstitutionComponent, canActivate: [authGuard]},
  { path: 'sogs', component: StandardOperatingGuidelinesComponent, canActivate: [authGuard]},
  { path: 'forms', component: FormsComponent, canActivate: [authGuard]},
  { path: 'radio-callsigns', component: RadioCallsignsComponent, canActivate: [authGuard]},
  { path: 'doh-resources', component: DepartmentOfHealthResourcesComponent, canActivate: [authGuard]},

  // Admin facing side
  /*
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Authenticated users only
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },  // Admins only
  { path: 'login', component: LoginComponent },
   */

  // Home/logout
  { path: 'logout', redirectTo: '/home'},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

// Export the app routing module
@NgModule
({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
