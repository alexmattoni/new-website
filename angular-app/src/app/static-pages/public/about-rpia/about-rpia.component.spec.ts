import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRPIAComponent } from './about-rpia.component';

describe('AboutRPIAComponent', () => {
  let component: AboutRPIAComponent;
  let fixture: ComponentFixture<AboutRPIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutRPIAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutRPIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
