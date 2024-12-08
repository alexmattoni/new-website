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

@Component({
  selector: 'app-fuel-log-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="dialog-wrapper">
    <h2 mat-dialog-title>Add Fuel Log Entry</h2>
    <form [formGroup]="fuelForm" (ngSubmit)="onSubmit()">
      <div class="form-content">
        <mat-form-field appearance="fill">
          <mat-label>Vehicle</mat-label>
          <mat-select formControlName="Vehicle">
            <mat-option [value]="0">5939</mat-option>
            <mat-option [value]="1">FR-59</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Amount</mat-label>
          <input matInput type="number" formControlName="Amount">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Mileage</mat-label>
          <input matInput type="number" formControlName="Mileage">
        </mat-form-field>
      </div>

      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!fuelForm.valid">
          Submit
        </button>
      </div>
      </form>
      </div>

  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
  `]
})
export class FuelLogDialogComponent 
{
  fuelForm: FormGroup;

  constructor
  (
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FuelLogDialogComponent>
  ) {
    this.fuelForm = this.fb.group({
      Vehicle: ['', Validators.required],
      Amount: ['', [Validators.required, Validators.min(0)]],
      Mileage: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.fuelForm.valid) {
      this.dialogRef.close(this.fuelForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

@Component({
  standalone: true,
  imports: 
  [
    CommonModule,
    MatButtonModule,
    MatDialogModule
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
      this.http.get('http://localhost:8080/api/fuel', {
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
      if (result) {
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
          next: () => {
            console.log('Entry added successfully');
            this.loadFuelData();
          },
          error: (error) => console.error('Error adding entry:', error)
        });
      }
    });
  }
}