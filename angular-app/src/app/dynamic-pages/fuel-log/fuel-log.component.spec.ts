import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelLogComponent } from './fuel-log.component';

describe('FuelLogComponent', () => {
  let component: FuelLogComponent;
  let fixture: ComponentFixture<FuelLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
