import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from "rxjs";
import { CommonEntity } from 'src/app/core/entities/common.entity';
import { AdminCRUDCommonService } from 'src/app/core/services/admin-crud-common.service';
import * as moment from "moment"; 
import { QuestionBase } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-base';
import { TableBaseUpdateCreateComponent } from 'src/app/components/table-base-update-create/table-base-update-create.component';

export class TableBase<
  Entity extends CommonEntity,
  EntityService extends AdminCRUDCommonService<Entity>
> {
  constructor(
    private entityService: EntityService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService
  ) {}

  public pageIndex = 1;
  public pageSize = 7;
  public total: Observable<Number>;
  public listOfData: Observable<Entity[]>;
  
  public loading: Observable<Boolean>;

  public sortValue: "DESC" | "ASC" = "DESC";
  public sortKey: String = "createdAt";

  public searchKey: string = "";
  public searchValue: any = "";

  public sort(sort: { key: string; value: string }): void {
    console.log(sort);
    if (sort && sort.value && sort.value.localeCompare("ascend") == 0) {
      this.sortValue = "ASC";
    } else {
      this.sortValue = "DESC";
    }
    this.sortKey = sort.key;
    this.searchData();
  }

  public searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }

    this.total = this.entityService.totalItemsInDB;
    this.listOfData = this.entityService.entities;
    this.loading = this.entityService.loading;
    this.entityService.loadEntitiesBy(
      this.pageIndex,
      this.pageSize,
      this.sortKey,
      this.sortValue,
      this.searchKey,
      this.searchValue
    );
  }

  public remove(entity: Entity) { 
    this.nzModalService.confirm({
      nzTitle: "Confirmation!",
      nzContent: `¿Estás seguro que quieres borrar este entidad con id ${entity.id}?`,
      nzOkText: "OK",
      nzCancelText: "Cancelar",
      nzOnOk: () => {
        this.entityService.remove(entity.id).subscribe(sdr => {
          if (sdr.code == 200) {
            this.nzModalService.success({
              nzTitle: "Successful",
              nzContent: sdr.message,
              nzOkText: "OK",
              nzCancelText: null
            });
          } else {
            this.nzModalService.error({
              nzTitle: "Failure",
              nzContent: sdr.message,
              nzOkText: "OK",
              nzCancelText: null
            });
          }
        });
      },
      nzOnCancel: () => {
        this.nzMessageService.info(
          "Cancelar. Nada ha cambiado!"
        );
      }
    });
  }

  public refresh() {
    this.searchData(true);
    this.sortKey = "createdAt";
  }
  public updateFilter(searchKey: string, searchValue: any): void {
    if (searchValue == null) {
      this.searchValue = "";
      this.searchKey = "";
    } else if (searchKey.localeCompare("createdAt") == 0) {
      this.searchKey = searchKey;
      this.searchValue = moment(searchValue).format("YYYY-MM-DD HH:mm");
    } else {
      this.searchKey = searchKey;
      this.searchValue = searchValue;
    }

    this.searchData(true);
  }

  dateForSearch: Date = null;

  showDetailModal(entity: Entity, title: string, component: any): void {
    this.entityService.actualEntityId = String(entity.id);
    this.entityService.actualEntity = entity;

    this.nzModalService.create({
      nzTitle: title,
      nzContent: component,
      nzWidth: "86vw",
      nzFooter: null
    });
  }

  showCustomModificationModal(
    entity: Entity,
    title: string,
    component: any
  ): void {
    this.entityService.actualEntityId = String(entity.id);
    this.entityService.actualEntity = entity;

    this.nzModalService.create({
      nzTitle: title,
      nzContent: component,
      nzWidth: "86vw",
      nzFooter: null
    });
  }

  showSimpleModificationModal(
    entity: Entity,
    title: string,
    questions: QuestionBase<any>[],
    width?: string
  ): void {
    this.entityService.actualEntityId = entity.id.toString();
    this.entityService.actualEntity = entity;
    this.nzModalService.create({
      nzTitle: title,
      nzContent: TableBaseUpdateCreateComponent,
      nzComponentParams: {
        questions: questions,
        entityService: this.entityService,
        isCreate: false
      },
      nzWidth: width ? width : "50vw",
      nzFooter: null
    });
  }

  showSimpleCreateModal(
    title: string,
    questions: QuestionBase<any>[],
    width?: string
  ): void {
    this.nzModalService.create({
      nzTitle: title,
      nzContent: TableBaseUpdateCreateComponent,
      nzComponentParams: {
        questions: questions,
        entityService: this.entityService,
        isCreate: true
      },
      nzWidth: width ? width : "50vw",
      nzFooter: null
    });
  }
}
