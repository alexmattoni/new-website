import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  selector: 'app-fuel-log',
  templateUrl: './fuel-log.component.html',
  styleUrls: ['./fuel-log.component.css'],
})
export class FuelLogComponent implements OnInit
{
  pageHeader = 'Fuel Log';
  selectedVehicle: string = 'Both';
  fuelData: any = [];
  
  async ngOnInit(): Promise<void>
  {
    this.loadFuelData();
  }

  // Filter fuel logs based on vehicle selection
  filteredFuelLogs = [...this.fuelData];

  // Handle filtering
  filterVehicle(vehicle: string) 
  {
    this.selectedVehicle = vehicle;
    if (vehicle === 'Both') 
    {
      this.filteredFuelLogs = [...this.fuelData];
    } else 
    {
      this.filteredFuelLogs = this.fuelData.filter(log => log.vehicle === vehicle);
    }
  }

  // Handle fetch of fuel data
  async loadFuelData(): Promise<void>
  {
    try 
    {
      await this.keycloakService.getToken().then(async keycloakToken => {
        this.http.get('https://directus.dev1.techinems.org/auth/login/keycloak', {}).toPromise().then(async directusToken => {
          console.log(directusToken)
        });});
    } catch (error) {
      console.error('Error fetching fuel data: ', error);
    }
  }

  // Handle  adding a new entry (customize this as needed)
  addEntry() {
    // Logic to add a new entry
    console.log('Add entry clicked!');
  }

  constructor(private keycloakService: KeycloakService, private http: HttpClient) {}
}
