import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAttendantComponent } from './training-attendant.component';

describe('TrainingAttendantComponent', () => {
  let component: TrainingAttendantComponent;
  let fixture: ComponentFixture<TrainingAttendantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingAttendantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingAttendantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
