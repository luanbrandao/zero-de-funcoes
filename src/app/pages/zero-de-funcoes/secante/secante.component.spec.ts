import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecanteComponent } from './secante.component';

describe('SecanteComponent', () => {
  let component: SecanteComponent;
  let fixture: ComponentFixture<SecanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
