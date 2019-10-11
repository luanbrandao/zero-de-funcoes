import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisseccaoComponent } from './bisseccao.component';

describe('BisseccaoComponent', () => {
  let component: BisseccaoComponent;
  let fixture: ComponentFixture<BisseccaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisseccaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisseccaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
