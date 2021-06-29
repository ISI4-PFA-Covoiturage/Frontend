import { TestBed } from '@angular/core/testing';

import { AuthenAdminService } from './authen-admin.service';

describe('AuthenAdminService', () => {
  let service: AuthenAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
