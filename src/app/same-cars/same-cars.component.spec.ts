import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SameCarsComponent } from './same-cars.component';

describe('SameCarsComponent', () => {
  let component: SameCarsComponent;
  let fixture: ComponentFixture<SameCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SameCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SameCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
