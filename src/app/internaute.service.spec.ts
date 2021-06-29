import { TestBed } from '@angular/core/testing';

import { InternauteService } from './internaute.service';

describe('InternauteService', () => {
  let service: InternauteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternauteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
