import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map } from 'rxjs/operators';
import { URLHttpMultipleDataResponse } from '../../entities-for-http/url-http-multiple-data-response.entity';
import { URLHttpSingleDataResponse } from '../../entities-for-http/url-http-single-data-response.entity';
import { ComentarioEntity } from '../../entities/comentario.entity';
import { PublicacionEntity } from '../../entities/publicacion.entity';

const uri = 'publicacion';
@Injectable({
  providedIn: 'root',
})
export class UsuarioPublicacionService {
  constructor(
    protected http: HttpClient,
    private messageService: NzMessageService
  ) {}
  create(entity: PublicacionEntity) {
    return this.http
      .post<URLHttpSingleDataResponse<PublicacionEntity>>(
        `usuario/grafitis`,
        entity
      )
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.messageService.success(`Creacion: ha tenido exito.`);
          } else {
            this.messageService.error(
              `Error al crear, ${sdr.code}: ${sdr.message}`
            );
          }

          return sdr;
        })
      );
  }
  modifyMiGrafitis(grafitis: PublicacionEntity) {
    return this.http
      .put<URLHttpSingleDataResponse<PublicacionEntity>>(
        `usuario/grafitis/${grafitis.id}`,
        grafitis
      )
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            if (sdr.code == 200) {
              this.messageService.success(`Modificacion: ha tenido exito.`);
            } else {
              this.messageService.error(
                `Error al modificar, ${sdr.code}: ${sdr.message}`
              );
            }
          }

          return sdr;
        })
      );
  }
  getMisGrafitis() {
    return this.http
      .get<URLHttpMultipleDataResponse<PublicacionEntity>>(`usuario/grafitis`)
      .pipe(
        map((sdr) => {
          if (sdr.code != 200) {
            this.messageService.error(
              `Error al pedir, ${sdr.code}: ${sdr.message}`
            );
          }

          return sdr.data;
        })
      );
  }
  deleteMyGraffiti(grafiti: PublicacionEntity) {
    return this.http
      .delete<URLHttpMultipleDataResponse<PublicacionEntity>>(
        `usuario/grafitis/${grafiti.id}`
      )
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.messageService.success(`Eliminacion: ha tenido exito.`);
          } else {
            this.messageService.error(
              `Error al eliminar, ${sdr.code}: ${sdr.message}`
            );
          }
          return sdr.data;
        })
      );
  }
  comment(
    idUsuario: number,
    idPublicacion: number,
    comentario: ComentarioEntity
  ) {
    return this.http
      .post<URLHttpSingleDataResponse<ComentarioEntity>>(
        `${uri}/${idPublicacion}/${idUsuario}`,
        comentario
      )
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.messageService.success(`Comentario enviado.`);
          } else {
            this.messageService.error(
              `Error al crear, ${sdr.code}: ${sdr.message}`
            );
          }

          return sdr.data;
        })
      );
  }
}
