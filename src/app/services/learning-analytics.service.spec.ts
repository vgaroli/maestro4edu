import { TestBed } from '@angular/core/testing';

import { LearningAnalyticsService } from './learning-analytics.service';

describe('LearningAnalyticsService', () => {
  let service: LearningAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
