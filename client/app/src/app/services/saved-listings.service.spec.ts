import { TestBed } from '@angular/core/testing';

import { SavedListingsService } from './saved-listings.service';

describe('SavedListingsService', () => {
  let service: SavedListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
