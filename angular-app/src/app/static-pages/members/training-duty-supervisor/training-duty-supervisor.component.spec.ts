import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDutySupervisorComponent } from './training-duty-supervisor.component';

describe('TrainingDutySupervisorComponent', () => {
  let component: TrainingDutySupervisorComponent;
  let fixture: ComponentFixture<TrainingDutySupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDutySupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDutySupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
