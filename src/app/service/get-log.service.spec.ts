import { TestBed } from '@angular/core/testing';

import { GetLogService } from './get-log.service';

describe('GetLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetLogService = TestBed.get(GetLogService);
    expect(service).toBeTruthy();
  });
});
