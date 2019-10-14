import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoFixoComponent } from './ponto-fixo.component';

describe('PontoFixoComponent', () => {
  let component: PontoFixoComponent;
  let fixture: ComponentFixture<PontoFixoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontoFixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoFixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
