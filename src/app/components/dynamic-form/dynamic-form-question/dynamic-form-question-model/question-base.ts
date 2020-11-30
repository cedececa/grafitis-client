export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  disabled: boolean;
  // for selections
  options: { id: string; name: string }[] = [];
  // for input
  type: string;
  errorMessage: string;
  warningMessage: string;

  constructor(
    settings: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      disabled?: boolean;

      options?: { id: string; name: string }[];
      type?: string;
      errorMessage?: string;
    } = {}
  ) {
    this.value = settings.value;
    this.key = settings.key || "";
    this.label = settings.label || "";
    this.required = !!settings.required;
    this.order = settings.order === undefined ? 1 : settings.order;
    this.controlType = settings.controlType || "";
    this.errorMessage = settings.errorMessage || "";
    this.disabled = settings.disabled || false;

    this.options = settings["options"] || [];
    this.type = settings["type"] || "";
  }
}

