import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteraAccionesComponent } from './cartera-acciones.component';

describe('CarteraAccionesComponent', () => {
  let component: CarteraAccionesComponent;
  let fixture: ComponentFixture<CarteraAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteraAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteraAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
