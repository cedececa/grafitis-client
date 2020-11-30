import { QuestionBase } from './question-base';

export class AngularRichEditorQuestion extends QuestionBase<string> {
    controlType = 'angular-rich-editor';

    constructor(settings: {} = {}) {
        super(settings);
    }
}

