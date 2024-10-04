import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

enum TimeFrame {
  month = "TIMEFRAME_MONTH",
  week = "TIMEFRAME_WEEK",
  day = "TIMEFRAME_DAY",
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createCalendarLabel(viewDate: Date, timeframe: TimeFrame): string {
  switch(timeframe){
  case TimeFrame.month:
    return monthNames[viewDate.getMonth()];
  case TimeFrame.week:
    return "Week Label Not Implemented";
  case TimeFrame.day:
    return "" + viewDate.getDay() + " " + monthNames[viewDate.getMonth()] + ", " + viewDate.getFullYear();
  }
}
 
@Component({
  selector: 'app-event-schedule',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './event-schedule.component.html',
  styleUrl: './event-schedule.component.css'
})
export class EventScheduleComponent {
  public viewDate: Date = new Date();
  public editEvents: boolean = false;
  public timeframe: TimeFrame = TimeFrame.month;
  public calendarLabel: string = "Events for " + createCalendarLabel(this.viewDate, this.timeframe);

  onChangeTimeFrame(event, newTimeFrame: string): void {
    this.timeframe = newTimeFrame as TimeFrame;
    this.calendarLabel = "Events for " + createCalendarLabel(this.viewDate, this.timeframe);
  }
  constructor(private keycloakService: KeycloakService) {}
  async ngOnInit(){
    const roles = this.keycloakService.getUserRoles();
    this.editEvents = roles.includes('website-admin') || roles.includes('website-event-scheduler');
  }

}

export { TimeFrame }
