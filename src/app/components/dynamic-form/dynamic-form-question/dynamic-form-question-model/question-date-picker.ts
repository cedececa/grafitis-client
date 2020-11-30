import { QuestionBase } from './question-base';

export class DatePickerQuestion extends QuestionBase<string> {
    controlType = 'date-picker';

    constructor(settings: {} = {}) {
        super(settings);
    }
}

