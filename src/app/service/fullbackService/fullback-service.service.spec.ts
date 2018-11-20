import { TestBed } from '@angular/core/testing';

import { FullbackServiceService } from './fullback-service.service';

describe('FullbackServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FullbackServiceService = TestBed.get(FullbackServiceService);
    expect(service).toBeTruthy();
  });
});
