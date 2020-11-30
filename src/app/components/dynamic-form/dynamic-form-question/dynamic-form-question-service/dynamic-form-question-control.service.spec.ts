import { TestBed } from '@angular/core/testing';

import { DynamicFormQuestionControlService } from './dynamic-form-question-control.service';

describe('DynamicFormQuestionControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicFormQuestionControlService = TestBed.get(DynamicFormQuestionControlService);
    expect(service).toBeTruthy();
  });
});
