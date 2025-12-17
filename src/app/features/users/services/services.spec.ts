import { TestBed } from '@angular/core/testing';

import { Services } from './user.service';

describe('Services', () => {
  let service: Services;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Services);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
