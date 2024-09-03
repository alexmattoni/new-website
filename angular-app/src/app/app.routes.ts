import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    
    // Add additional routes here
    //{ path: '**', component: OtherComponent } // Wildcard route for 404 pages
];