import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockingIssueComponent } from './stocking-issue.component';

describe('StockingIssueComponent', () => {
  let component: StockingIssueComponent;
  let fixture: ComponentFixture<StockingIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockingIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockingIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
