import { TestBed } from '@angular/core/testing';

import { GeekieService } from './geekie.service';

describe('GeekieService', () => {
  let service: GeekieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeekieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
