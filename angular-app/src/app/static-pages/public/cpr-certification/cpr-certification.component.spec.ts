import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CprCertificationComponent } from './cpr-certification.component';

describe('CprCertificationComponent', () => {
  let component: CprCertificationComponent;
  let fixture: ComponentFixture<CprCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CprCertificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CprCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
