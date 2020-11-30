import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PublicacionEntity } from 'src/app/core/entities/publicacion.entity';
import { AdminPublicacionService } from 'src/app/core/services/admin-services/admin.publicacion.service';
import { TableBase } from '../table-base';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  constructor(
    private adminUsuarioService: AdminPublicacionService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService
  ) {}

  table: TableBase<PublicacionEntity, AdminPublicacionService>;
  ngOnInit(): void {
    this.table = new TableBase(
      this.adminUsuarioService,
      this.nzModalService,
      this.nzMessageService
    );
    this.table.pageSize = 6;
    this.table.searchData();
  }

  showSimpleModificationModal(publicacion: PublicacionEntity): void {
    this.adminUsuarioService.load(publicacion.id.toString()).subscribe((sdr) => {
      this.table.showSimpleModificationModal(
        publicacion,
        'Publicacion Modification',
        this.adminUsuarioService.toQuestions(sdr.data)
      );
    });
  }
  showSimpleCreateModal(): void {
    this.table.showSimpleCreateModal(
      'Publicacion Creation',
      this.adminUsuarioService.getQuestionsForNew()
    );
  }
}
