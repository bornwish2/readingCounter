import { TestBed } from '@angular/core/testing';

import { LoadAgentDataService } from './load-agent-data.service';

describe('LoadAgentDataService', () => {
  let service: LoadAgentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadAgentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
