import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormQuestionControlService } from "./dynamic-form-question/dynamic-form-question-service/dynamic-form-question-control.service";
import { QuestionBase } from "./dynamic-form-question/dynamic-form-question-model/question-base";
import { AdminCRUDCommonService } from 'src/app/core/services/admin-crud-common.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
  providers: [DynamicFormQuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[];
  @Input() crudService: AdminCRUDCommonService<any>;
  @Input() isCreate: boolean;

  form: FormGroup;
  payLoad = "";

  constructor(
    private qcs: DynamicFormQuestionControlService,
    private nzModalService: NzModalService,
    private nzModalRef: NzModalRef
  ) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    this.payLoad = JSON.stringify(this.form.value);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);

    if (!this.isCreate) {
      this.crudService.update(this.form.value).subscribe(sdr => {
        this.handleStatus(sdr);
      });
    } else {
      console.log("create")
      this.crudService.create(this.form.value).subscribe(sdr => {
        this.handleStatus(sdr);
      });
    }
  }

  handleStatus(sdr) {
    if (sdr.code == 200) {
      this.nzModalService.success({
        nzTitle: "Successful",
        nzContent: sdr.message,
        nzOkText: "OK",
        nzCancelText: null
      });
      this.nzModalRef.close();
    } else {
      this.nzModalService.error({
        nzTitle: "Failure",
        nzContent: sdr.message,
        nzOkText: "OK",
        nzCancelText: null
      });
    }
  }
}
