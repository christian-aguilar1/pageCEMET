import { TestBed } from '@angular/core/testing';

import { RealtimeService } from './carreras.service';

describe('RealtimeService', () => {
  let service: RealtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
