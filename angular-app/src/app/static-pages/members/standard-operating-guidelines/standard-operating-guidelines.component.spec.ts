import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardOperatingGuidelinesComponent } from './standard-operating-guidelines.component';

describe('StandardOperatingGuidelinesComponent', () => {
  let component: StandardOperatingGuidelinesComponent;
  let fixture: ComponentFixture<StandardOperatingGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardOperatingGuidelinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardOperatingGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
