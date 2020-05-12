import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraAccionesComponent } from './compra-acciones.component';

describe('CompraAccionesComponent', () => {
  let component: CompraAccionesComponent;
  let fixture: ComponentFixture<CompraAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
