import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCrewChiefComponent } from './training-crew-chief.component';

describe('TrainingCrewChiefComponent', () => {
  let component: TrainingCrewChiefComponent;
  let fixture: ComponentFixture<TrainingCrewChiefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingCrewChiefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCrewChiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
