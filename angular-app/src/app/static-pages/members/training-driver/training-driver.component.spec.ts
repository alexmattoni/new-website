import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDriverComponent } from './training-driver.component';

describe('TrainingDriverComponent', () => {
  let component: TrainingDriverComponent;
  let fixture: ComponentFixture<TrainingDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
