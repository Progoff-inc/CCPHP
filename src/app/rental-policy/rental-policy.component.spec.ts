import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPolicyComponent } from './rental-policy.component';

describe('RentalPolicyComponent', () => {
  let component: RentalPolicyComponent;
  let fixture: ComponentFixture<RentalPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
