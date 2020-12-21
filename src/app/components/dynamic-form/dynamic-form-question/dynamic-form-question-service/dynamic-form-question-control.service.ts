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
        if (question.required) {
          group[question.key] = new FormControl(
            {
              value: question.value || '',
              disabled: question.disabled ? true : false,
            },
            Validators.required
          );
        } else {
          group[question.key] = new FormControl(
            {
              value: question.value || '',
              disabled: question.disabled ? true : false,
            },
            Validators.required
          );
        }
      }
    });

    console.log(questions);
    return new FormGroup(group);
  }
  convertDeliveryAddresstoFormGroup() {}
}
