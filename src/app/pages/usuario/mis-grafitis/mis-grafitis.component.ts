import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { PublicacionEntity } from 'src/app/core/entities/publicacion.entity';
import { UsuarioPublicacionService } from 'src/app/core/services/usuario-services/usuario-publicacion.service';
import { ModifyMyGraffitiComponent } from './modify-my-graffiti/modify-my-graffiti.component';

@Component({
  selector: 'app-mis-grafitis',
  templateUrl: './mis-grafitis.component.html',
  styleUrls: ['./mis-grafitis.component.css'],
})
export class MisGrafitisComponent implements OnInit {
  refresh() {
    this.listOfData$ = this.usuarioPublicacionService.getMisGrafitis();
  }
  listOfData$: Observable<
    PublicacionEntity[]
  > = this.usuarioPublicacionService.getMisGrafitis();
  constructor(
    private usuarioPublicacionService: UsuarioPublicacionService,
    private nzModalService: NzModalService,
    private nzMessageService: NzMessageService
  ) {}
  preImageUrlForLoad = 'http://localhost:3000';

  ngOnInit(): void {}
  previewVisible = false;
  imageFullUrl = '';
  openPreviewModal(fotoUrl: string) {
    this.imageFullUrl = this.preImageUrlForLoad + '/' + fotoUrl;
    this.previewVisible = true;
  }

  openModifyGrafitisModal(toBeModified: PublicacionEntity) {
    this.nzModalService.create({
      nzTitle: 'Modificar Grafitis',
      nzContent: ModifyMyGraffitiComponent,
      nzComponentParams: {
        toBeModified: toBeModified,
      } as any,
      nzWidth: '500px',
      nzFooter: null,
    });
  }
  public remove(entity: PublicacionEntity) {
    this.nzModalService.confirm({
      nzTitle: 'Confirmacion!',
      nzContent: `Estas seguro/a que desea eliminar? ${entity.id}?`,
      nzOkText: 'OK',
      nzCancelText: 'Cancelar',
      nzOnOk: () => {
        this.usuarioPublicacionService.deleteMyGraffiti(entity).subscribe(()=>{
          this.refresh()
        });
      },
      nzOnCancel: () => {
        this.nzMessageService.info(
          'Nada ha cambiado.'
        );
      },
    });
  }
}
