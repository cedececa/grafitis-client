import { QuestionBase } from './question-base';

export class QuestionArray extends QuestionBase<string> {
  controlType = 'array';

  constructor(settings: {} = {}) {
    super(settings);
  }
}
