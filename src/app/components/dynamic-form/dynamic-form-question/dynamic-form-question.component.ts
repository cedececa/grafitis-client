import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { QuestionBase } from './dynamic-form-question-model/question-base';

/* import { Ng2ImgMaxService } from "ng2-img-max";

// Rich Editor
import * as QuillNamespace from "quill";
let Quill: any = QuillNamespace;
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

const parchment = Quill.import("parchment");
const block = parchment.query("block");
block.tagName = "DIV";
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
//Quill.register(block or NewBlock , true);

/* import { AngularEditorConfig } from '@kolkov/angular-editor'; */

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  /*  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }; */

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.id === o2.id : o1 === o2);

  ngOnInit(): void {
    this.richEditorInitialization();
    this.checkIfIsImage();
/*     if (this.question.key.localeCompare('id') == 0) {
      this.question.disabled = true;
    } */
  }

  // Image Uploader
  constructor( private ng2ImgMaxService: Ng2ImgMaxService ) {}

  checkIfIsImage() {
    if (
      this.question.controlType &&
      this.question.controlType.localeCompare('image-uploader') == 0
    ) {
      this.image = this.form.get(this.question.key).value;
    }
  }

  changeListener($event, questionKey: string): void {
    this.readThis($event.target, questionKey);
  }

  image: string | any = '';
  readThis(inputValue: any, questionKey: string): void {
    var file: File = inputValue.files[0];

    this.ng2ImgMaxService.resize([file], 200, 200).subscribe((blob) => {
      let reader = new FileReader();
      reader.readAsDataURL(blob); // converts the blob to base64 and calls onload

      reader.onload = () => {
        this.form.get(questionKey).setValue(reader.result);
        this.image = reader.result;
      };
    });
  }

  // Color Picker
  setColor(event: string): void {
    this.form.get(this.question.key).setValue(event);
  }

  // rich content editor
  modulesForQuill: {};
  richEditorInitialization() {
    this.modulesForQuill = {
      /*       fullscreen: {},
       */ toolbar: {
        container: [
          [{ font: [] }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ header: 1 }, { header: 2 }],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['image'],
          /*           ["fullscreen"]
           */
        ],
      },
      imageResize: true,
    };
  }

  /*
  
       It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
      when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
      you. We recommend using this approach to avoid 'changed after checked' errors.
       
      Example: 
      form = new FormGroup({
        first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
        last: new FormControl('Drew', Validators.required)
      });
    
  
  */
}
