import { TestBed } from '@angular/core/testing';

import { GetPluginService } from './get-plugin.service';

describe('GetPluginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPluginService = TestBed.get(GetPluginService);
    expect(service).toBeTruthy();
  });
});
