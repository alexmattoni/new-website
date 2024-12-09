import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';

@Component
({
  selector: 'app-fuel-log-dialog',
  standalone: true,
  imports: 
  [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: 'dialog.html',
  styles: 
  `
  .mat-mdc-form-field
  {
    display: flex;
  }
  
  .mat-form-field 
  {
    width: 100%;
  }

  .button-spaced
  {
    margin: 10px;
  }

  .dialog-actions
  {
    text-align: center;
  }

  .form-content
  {
    padding-left: 20px;
    padding-right: 20px;
  }
  `
})
export class FuelLogDialogComponent 
{
  fuelForm: FormGroup;

  constructor
  (
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FuelLogDialogComponent>
  ) {
    this.fuelForm = this.fb.group
    ({
      Vehicle: ['', Validators.required],
      Amount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      Mileage: ['', [Validators.required, Validators.min(0), Validators.max(1000000)]]
    });
  }

  onSubmit()
  {
    if(this.fuelForm.valid) 
    {
      this.dialogRef.close(this.fuelForm.value);
    }
  }

  onCancel(event: MouseEvent) 
  {
    // Prevent from accidentally submitting
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.close(false);
  }
}

@Component
({
  standalone: true,
  imports: 
  [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  selector: 'app-fuel-log',
  templateUrl: './fuel-log.component.html',
  styleUrls: ['./fuel-log.component.css'],
})
export class FuelLogComponent implements OnInit 
{
  pageHeader = 'Fuel Log';
  selectedVehicle: string = 'Both';
  fuelData: any = [];

  // Pagination Controls
  currentPage = 1;
  itemsPerPage = 10;
  
  vehicleTypeMap: { [key: number]: string } = 
  {
    0: '5939',
    1: 'FR-59'
  };
  
  filteredFuelLogs = [...this.fuelData];

  constructor
  (
    private keycloakService: KeycloakService, 
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadFuelData();
  }

  filterVehicle(vehicle: string)
  {
    this.selectedVehicle = vehicle;
    this.filteredFuelLogs = vehicle === 'Both' ? 
    [...this.fuelData] : this.fuelData.filter(log => log.vehicle === vehicle);
  }

  async loadFuelData(): Promise<void> 
  {
    try {
      const token = await this.keycloakService.getToken();
      this.http.get('http://localhost:8080/api/fuel', 
      {
        headers: { 'Authorization': `Bearer ${token}`}
      }).subscribe(resp => 
        { 
          this.fuelData = (resp as any[]).map(log => 
        ({
          ...log,
          time_created: new Date(log.time).toLocaleTimeString(),
          date_created: new Date(log.time).toLocaleDateString(),
          user_created: log.memberFirstName + " " + log.memberLastName,
          vehicle: this.vehicleTypeMap[log.vehicle] || log.vehicle
        }));
        this.filteredFuelLogs = [...this.fuelData];
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  addEntry() 
  {
    const dialogRef = this.dialog.open(FuelLogDialogComponent, 
    {
      width: '70vw',
      height: '70vh',
    });

    dialogRef.afterClosed().subscribe(async result => 
    {
      // Don't submit on cancel
      if(result == false)
        return;

      // Submit on submit when there's an actual result (not undefined, like from pressing escape)
      if(result) 
      {
        const token = await this.keycloakService.getToken();
        this.http.post('http://localhost:8080/api/fuel', 
        {
          ...result,
          MemberId: await this.keycloakService.getKeycloakInstance().subject
        }, 
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }).subscribe
        ({
          next: () =>
          {
            this.loadFuelData();
          },
          error: (error) => console.error('Error adding entry:', error)
        });
      }
    });
  }
}