import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component
({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit
 {
  events: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngAfterViewInit(): void 
  {
    //this.loadEvents();
  }

  /*
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
  */
 
  readMore(): void 
  {
    const activeItemId = document.querySelector('.item.active')?.getAttribute('id');
    if (activeItemId) {
      this.router.navigate([`/${activeItemId}`]);
    }
  }
}
