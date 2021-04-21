import { TestBed } from '@angular/core/testing';

import { LetrusService } from './letrus.service';

describe('LetrusService', () => {
  let service: LetrusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetrusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
