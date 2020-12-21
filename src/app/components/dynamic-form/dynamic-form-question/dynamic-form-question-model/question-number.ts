import { QuestionBase } from './question-base';

export class NumberQuestion extends QuestionBase<string> {
    controlType = 'number';

    constructor(settings: {} = {}) {
        super(settings);
    }
}
