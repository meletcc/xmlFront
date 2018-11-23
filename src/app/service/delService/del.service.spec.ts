import { TestBed } from '@angular/core/testing';

import { DelService } from './del.service';

describe('DelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelService = TestBed.get(DelService);
    expect(service).toBeTruthy();
  });
});
