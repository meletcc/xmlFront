import { TestBed } from '@angular/core/testing';

import { DelPluginService } from './del-plugin.service';

describe('DelPluginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DelPluginService = TestBed.get(DelPluginService);
    expect(service).toBeTruthy();
  });
});
