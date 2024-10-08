import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  selector: 'app-fuel-log',
  templateUrl: './fuel-log.component.html',
  styleUrls: ['./fuel-log.component.css'],
})
export class FuelLogComponent 
{
  pageHeader = 'Fuel Log';
  selectedVehicle: string = 'Both';
  
  // Sample data for the fuel logs
  fuelLogs = 
  [
    { date: '2024-10-01', time: '08:00', member: 'Alex Mattoni', vehicle: 'FR-59', fuel: '50.5', mileage: '12000' },
    { date: '2024-10-02', time: '09:30', member: 'Christian Kegel', vehicle: '5939', fuel: '40.3', mileage: '9000' },
    { date: '2024-10-03', time: '10:00', member: 'Dan Bruce', vehicle: 'FR-59', fuel: '45.1', mileage: '13000' },
  ];

  // Filtered fuel logs based on vehicle selection
  filteredFuelLogs = [...this.fuelLogs];

  // Method to handle filtering
  filterVehicle(vehicle: string) 
  {
    this.selectedVehicle = vehicle;
    if (vehicle === 'Both') 
    {
      this.filteredFuelLogs = [...this.fuelLogs];
    } else 
    {
      this.filteredFuelLogs = this.fuelLogs.filter(log => log.vehicle === vehicle);
    }
  }

  // Method to handle adding a new entry (customize this as needed)
  addEntry() {
    // Logic to add a new entry
    console.log('Add entry clicked!');
  }
}
