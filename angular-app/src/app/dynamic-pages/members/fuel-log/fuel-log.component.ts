import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  // Vehicle type mapping
  vehicleTypeMap: { [key: number]: string } = 
  {
    0: '5939',
    1: 'FR-59'
  };
  
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
      this.http.get('http://localhost:8080/api/fuel', 
      {
        headers: { 'Authorization': "Bearer " + await this.keycloakService.getToken()}
      }).subscribe(resp => 
      {
        // Map the fuel data to apply vehicle type mapping
        this.fuelData = (resp as any[]).map(log => ({
          ...log,
          time_created: new Date(log.time).toLocaleTimeString(),
          date_created: new Date(log.time).toLocaleDateString(),
          vehicle: this.vehicleTypeMap[log.vehicle] || log.vehicle // map 0/1 to vehicle type
        }));

        // Initialize filtered fuel logs
        this.filteredFuelLogs = [...this.fuelData];
        console.log(this.fuelData);
      });
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
