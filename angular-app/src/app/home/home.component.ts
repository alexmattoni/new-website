import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component
({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
 {
  events: any[] = [];
  slides =
  [
    {
      title: 'RPI Ambulance',
      description: 'RPI Ambulance is a student run and operated Basic Life Support (BLS) transporting ambulance agency that serves the RPI campus and surrounding communities. We respond to approximately 150 to 200 calls and provide first aid coverage to about 25 special events every academic year.',
      backgroundImage: 'img/slider/bg1-DS.jpg',
      id: 'rpia-about'
    },
    {
      title: '5939',
      description: 'RPI Ambulance operates a 2006 AEV Trauma Hawk XL Type II ambulance mounted on a Ford E-350 chassis. This vehicle was placed in service in the Spring of 2007. The county vehicle identifier is 5939, however the ambulance was formerly known as A-39 and continues to hold this call sign within the agency. 5939 is the fifth ambulance operated by RPI Ambulance. The first was placed in service in 1983.',
      backgroundImage: 'img/slider/bg2-DS.jpg',
      id: '5939-about'
    },
    {
      title: 'FR-59',
      description: 'First Response 59 is RPI Ambulance\'s first response vehicle. It is a 2007 Ford Explorer that was first placed in service with the agency in October of 2014. FR-59 is equipped to NYS Part 800.26 with a full complement of disposable medical supplies, splints, epinephrine, a glucometer and a foldable backboard.',
      backgroundImage: 'img/slider/bg3-DS.jpg',
      id: 'fr59-about'
    }
  ];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void 
  {
    this.loadEvents();
  }

  loadEvents(): void 
  {
    this.http.post<any[]>('front_events.php', {}, 
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe(response => 
    {
      this.events = response.filter(event => event.limit === -1);

      this.events.forEach(event =>
      {
        const dateParts = event.date.split("-");
        event.date = `${dateParts[1].replace(/^0+/, '')}/${dateParts[2].replace(/^0+/, '')}/${dateParts[0]}`;
      });
    });
  }

  readMore(): void 
  {
    const activeItemId = document.querySelector('.item.active')?.getAttribute('id');
    if (activeItemId) {
      this.router.navigate([`/${activeItemId}`]);
    }
  }
}
