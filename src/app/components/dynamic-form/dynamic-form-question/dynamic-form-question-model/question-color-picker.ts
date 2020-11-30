import { QuestionBase } from './question-base';

export class ColorPickerQuestion extends QuestionBase<string> {
    controlType = 'color-picker';

    constructor(settings: {} = {}) {
        super(settings);
    }
}

