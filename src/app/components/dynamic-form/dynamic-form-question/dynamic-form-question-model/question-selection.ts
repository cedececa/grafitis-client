import { QuestionBase } from './question-base';

export class SelectionQuestion extends QuestionBase<string> {
  controlType = 'selection';

  constructor(settings: {} = {}) {
    super(settings);
  }
}

