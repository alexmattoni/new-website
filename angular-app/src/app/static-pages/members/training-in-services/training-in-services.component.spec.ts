import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingInServicesComponent } from './training-in-services.component';

describe('TrainingInServicesComponent', () => {
  let component: TrainingInServicesComponent;
  let fixture: ComponentFixture<TrainingInServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingInServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingInServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
