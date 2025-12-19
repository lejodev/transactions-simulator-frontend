import { TestBed } from '@angular/core/testing';

import { Cus } from './cus.service';

describe('Cus', () => {
  let service: Cus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
