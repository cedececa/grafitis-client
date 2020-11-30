import { QuestionBase } from './question-base';

export class SwitchQuestion extends QuestionBase<Boolean> {
    controlType = 'switch';

    constructor(settings: {} = {}) {
        super(settings);
    }
}

