import { TestBed } from '@angular/core/testing';

import { FinnhubService } from './finnhub.service';

describe('FinnhubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinnhubService = TestBed.get(FinnhubService);
    expect(service).toBeTruthy();
  });
});
