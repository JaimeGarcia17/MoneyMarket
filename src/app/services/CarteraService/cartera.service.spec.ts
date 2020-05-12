import { TestBed } from '@angular/core/testing';

import { CarteraService } from './cartera.service';

describe('CarteraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarteraService = TestBed.get(CarteraService);
    expect(service).toBeTruthy();
  });
});
