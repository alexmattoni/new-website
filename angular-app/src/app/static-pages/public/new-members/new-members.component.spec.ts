import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembersComponent } from './new-members.component';

describe('NewMembersComponent', () => {
  let component: NewMembersComponent;
  let fixture: ComponentFixture<NewMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
