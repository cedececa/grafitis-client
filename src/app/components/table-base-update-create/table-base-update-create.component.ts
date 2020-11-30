import { Component, OnInit, Input } from "@angular/core";
import { AdminCRUDCommonService } from 'src/app/core/services/admin-crud-common.service';
import { QuestionBase } from "../dynamic-form/dynamic-form-question/dynamic-form-question-model/question-base";

@Component({
  selector: "app-table-base-update-create",
  templateUrl: "./table-base-update-create.component.html",
  styleUrls: ["./table-base-update-create.component.scss"]
})
export class TableBaseUpdateCreateComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() entityService: AdminCRUDCommonService<any>;
  @Input() isCreate: boolean;

  ngOnInit() {}
}
