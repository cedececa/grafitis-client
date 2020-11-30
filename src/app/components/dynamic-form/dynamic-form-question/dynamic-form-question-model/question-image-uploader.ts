import { QuestionBase } from "./question-base";

export class ImageUploaderQuestion extends QuestionBase<string> {
  controlType = "image-uploader";

  constructor(settings: {} = {}) {
    super(settings);
  }
}

