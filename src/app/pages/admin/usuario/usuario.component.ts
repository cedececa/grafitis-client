import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UsuarioEntity } from 'src/app/core/entities/usuario.entity';
import { AdminUsuarioService } from 'src/app/core/services/admin-services/admin.usuario.service';
import { TableBase } from '../table-base';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  constructor(
    private adminUsuarioService: AdminUsuarioService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService
  ) {}

  table: TableBase<UsuarioEntity, AdminUsuarioService>;
  ngOnInit(): void {
    this.table = new TableBase(
      this.adminUsuarioService,
      this.nzModalService,
      this.nzMessageService
    );
    this.table.pageSize = 10;
    this.table.searchData();
  }

  showSimpleModificationModal(usuario: UsuarioEntity): void {
    this.adminUsuarioService.load(usuario.id.toString()).subscribe((sdr) => {
      this.table.showSimpleModificationModal(
        usuario,
        'Usuario Modification',
        this.adminUsuarioService.toQuestions(sdr.data)
      );
    });
  }
  showSimpleCreateModal(): void {
    this.table.showSimpleCreateModal(
      'Usuario Creation',
      this.adminUsuarioService.getQuestionsForNew()
    );
  }
}
