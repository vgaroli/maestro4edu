import { TestBed } from '@angular/core/testing';

import { GoogleUsersService } from './google-users.service';

describe('GoogleUsersService', () => {
  let service: GoogleUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
