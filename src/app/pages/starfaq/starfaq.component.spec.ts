import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarfaqComponent } from './starfaq.component';

describe('StarfaqComponent', () => {
  let component: StarfaqComponent;
  let fixture: ComponentFixture<StarfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
