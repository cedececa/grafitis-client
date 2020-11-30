import { Injectable } from '@angular/core';
import { QuestionBase } from '../dynamic-form-question-model/question-base';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormQuestionControlService {
  constructor() {}
  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {}; // new json
    questions.forEach((question) => {
      if (question.controlType == 'array') {
        group[question.key] = this.toFormGroup(question.value);
      } else {
        group[question.key] = question.required
          ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      }
    });

    console.log(questions);
    return new FormGroup(group);
  }
  convertDeliveryAddresstoFormGroup() {}
}
