import { TestBed } from '@angular/core/testing';

import { ListingDetailsService } from './listing-details.service';

describe('ListingDetailsService', () => {
  let service: ListingDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
