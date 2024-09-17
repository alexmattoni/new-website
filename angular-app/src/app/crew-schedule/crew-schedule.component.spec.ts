import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewScheduleComponent } from './crew-schedule.component';

describe('CrewScheduleComponent', () => {
  let component: CrewScheduleComponent;
  let fixture: ComponentFixture<CrewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
