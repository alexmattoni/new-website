import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCallsignsComponent } from './radio-callsigns.component';

describe('RadioCallsignsComponent', () => {
  let component: RadioCallsignsComponent;
  let fixture: ComponentFixture<RadioCallsignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioCallsignsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioCallsignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
