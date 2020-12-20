import { TestBed } from '@angular/core/testing';

import { LoadingSpinModalService } from './loading-spin-modal.service';

describe('LoadingSpinModalService', () => {
  let service: LoadingSpinModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSpinModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
