import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { readItems } from '@directus/sdk';
import { directus, fuelItem } from '../../../../directus';

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
      this.fuelData = await directus.request<fuelItem>(readItems('Fuel'));
      console.log(this.fuelData);
      this.filterVehicle('Both');
    } catch (error) {
      console.error('Error fetching fuel data: ', error);
    }
  }

  // Handle  adding a new entry (customize this as needed)
  addEntry() {
    // Logic to add a new entry
    console.log('Add entry clicked!');
  }
}
