import { TestBed } from '@angular/core/testing';

import { ListingOperationsService } from './listing-operations.service';

describe('ListingOperationsService', () => {
  let service: ListingOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
