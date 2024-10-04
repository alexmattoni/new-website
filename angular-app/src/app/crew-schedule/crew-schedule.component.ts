import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import {readItems} from "@directus/sdk";

@Component({
  selector: 'app-crew-schedule',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './crew-schedule.component.html',
  styleUrl: './crew-schedule.component.css'
})
export class CrewScheduleComponent implements OnInit {
  public canModifySchedule: boolean = false;
  public memberList: Member;

  constructor(private keycloakService: KeycloakService) {}
  async ngOnInit(){
    const roles = this.keycloakService.getUserRoles();
    this.canModifySchedule = roles.includes('website-admin') || roles.includes('website-crew-scheduler');
  }
}
