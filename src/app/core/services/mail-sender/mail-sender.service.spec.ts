import { TestBed } from '@angular/core/testing';

import { SendMailerService } from './mail-sender.service';

describe('SendMailerService', () => {
  let service: SendMailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
