import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { NavLink } from '../NavLinkModel';
import { KeycloakService } from 'keycloak-angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})

export class app_header
{
  // Links available to everyone (guests)
  public guestLinks: NavLink[] = 
  [
    { title: 'Home', route: '/home', adminOnly: false, dropdownItems: [] },
    { 
      title: 'About Us', 
      route: '', 
      adminOnly: false,
      dropdownItems:
       [
        { title: 'About RPI Ambulance', route: '/about-rpia' },
        { title: 'FAQs', route: '/faqs' },
        { title: 'Officers', route: "/officers" },
        { title: 'Apparatus', route: "/apparatus" },
      ]
    },
    { title: 'Join Us', route: '/join', adminOnly: false, dropdownItems: [] },
    { 
      title: 'Outreach', 
      route: '', 
      adminOnly: false,
      dropdownItems:
       [
        { title: 'New Members', route: '/new-members' },
        { title: 'CPR Certification', route: '/cpr-certification' },
        { title: 'Outreach', route: "/outreach" },
      ]
    },
    { title: 'Request Coverage', route: '/request-coverage', adminOnly: false, dropdownItems: [] },
    { title: 'Members', route: '/crew-schedule', adminOnly: false, dropdownItems: [] },
    { title: 'Contact Us', route: '/contact-us', adminOnly: false, dropdownItems: [] },
  ];

  // Links for logged-in members
  public memberLinks: NavLink[] = 
  [
    { title: 'Home', route: '/home', adminOnly: false, dropdownItems: []},
    {
      title: 'Scheduling',
      route: '',
      adminOnly: false,
      dropdownItems:
      [
        { title: 'Crews', route: '/crew-schedule' },
        { title: 'Events', route: '/event-schedule' }
      ]
    }
  ];

  // Admin-only links
  public adminLinks: NavLink[] = 
  [
    { 
      title: 'Admin', 
      route: '', 
      adminOnly: true,
      dropdownItems: 
      [
        { title: 'Modify Schedule', route: '/admin/users' },
        { title: 'Edit Default Schedule', route: '/admin/settings' }
      ]
    }
  ];

  public isAuthenticated = false;
  public isAdmin = false;
  public isHomeRoute = false;
  public userFirstName = 'user'

  // Use authentication service to check if user is a member or admin
  constructor(private keycloakService: KeycloakService, private router: Router) {}
  async ngOnInit() 
  {
    // Check if the user is authenticated
    this.isAuthenticated = await this.keycloakService.isLoggedIn();

    // Check if the user is trying to get to the home route (so we can always show the home stuff, even if logged in)
    const homeRoutes: string[] = ['/home', '/about-rpia', '/faqs', '/officers', '/apparatus', '/join', '/new-members', '/cpr-certification', '/outreach', '/request-coverage', '/contact-us']
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomeRoute = homeRoutes.includes(event.urlAfterRedirects);
    });

    // If the user is authenticated, check if they have the admin role and get their profile
    if (this.isAuthenticated) 
    {
      const userProfile = await this.keycloakService.loadUserProfile();
      if(userProfile.firstName)
        this.userFirstName = userProfile.firstName;
      else
        this.userFirstName = "user";

      const roles = this.keycloakService.getUserRoles();
      this.isAdmin = roles.includes('admin');
    }
  }

  logout() 
  {
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.keycloakService.logout(window.location.origin).then(() => 
    {
      // Navigate to home after logout
      this.router.navigate(['/home']);
    });
  }
}
