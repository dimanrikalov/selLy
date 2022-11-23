import { TestBed } from '@angular/core/testing';

import { CreateListingService } from './create-listing.service';

describe('CreateListingService', () => {
  let service: CreateListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
