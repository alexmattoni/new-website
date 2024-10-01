import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCoverageComponent } from './request-coverage.component';

describe('RequestCoverageComponent', () => {
  let component: RequestCoverageComponent;
  let fixture: ComponentFixture<RequestCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestCoverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
