import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentOfHealthResourcesComponent } from './department-of-health-resources.component';

describe('DepartmentOfHealthResourcesComponent', () => {
  let component: DepartmentOfHealthResourcesComponent;
  let fixture: ComponentFixture<DepartmentOfHealthResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentOfHealthResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentOfHealthResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
