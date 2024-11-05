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
  
  // Load fuel data on init
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
      //this.fuelData = await this.http.get('https://directus.dev1.techinems.org/items/Fuel');
    } catch (error)
    {
      console.error(error);
    }
  }
  
  // Add an entry
  addEntry() 
  {
    console.log('Add entry clicked!');
  }

  constructor(private keycloakService: KeycloakService, private http: HttpClient) {}
}
