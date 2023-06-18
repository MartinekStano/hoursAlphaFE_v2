import { TestBed } from '@angular/core/testing';

import { WorkDayService } from './work-day.service';

describe('WorkDayService', () => {
  let service: WorkDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
