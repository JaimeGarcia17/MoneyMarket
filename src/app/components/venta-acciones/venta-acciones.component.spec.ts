import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaAccionesComponent } from './venta-acciones.component';

describe('VentaAccionesComponent', () => {
  let component: VentaAccionesComponent;
  let fixture: ComponentFixture<VentaAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
