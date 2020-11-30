import { QuestionBase } from './question-base';

export class RichContentEditorQuestion extends QuestionBase<string> {
    controlType = 'rich-content-editor';

    constructor(settings: {} = {}) {
        super(settings);
    }
}

