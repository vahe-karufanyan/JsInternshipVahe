import { TestBed } from '@angular/core/testing';

import { ItemRequestsService } from './item-requests.service';

describe('ItemRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemRequestsService = TestBed.get(ItemRequestsService);
    expect(service).toBeTruthy();
  });
});
