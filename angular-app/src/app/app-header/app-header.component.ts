import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavLink } from '../NavLinkModel';


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
  public memberLinks: NavLink[] = [
    { title: 'Home', route: '/crew-schedule', adminOnly: false, dropdownItems: [] },
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
}
