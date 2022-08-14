import { TestBed } from '@angular/core/testing';

import { DataorangService } from './dataorang.service';

describe('DataorangService', () => {
  let service: DataorangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataorangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
