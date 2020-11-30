import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionBase } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-base';
import { TextboxQuestion } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-textbox';
import { DatePickerQuestion } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-date-picker';
import { URLHttpMultipleDataResponse } from '../../entities-for-http/url-http-multiple-data-response.entity';
import { URLHttpSingleDataResponse } from '../../entities-for-http/url-http-single-data-response.entity';
import { AdminCRUDCommonService } from '../admin-crud-common.service';
import { QuestionArray } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-json';
import { PublicacionEntity } from '../../entities/publicacion.entity';

const uri = 'publicacion';
@Injectable({
  providedIn: 'root',
})
export class AdminPublicacionService extends AdminCRUDCommonService<PublicacionEntity> {
  constructor(http: HttpClient) {
    super(http, PublicacionEntity, uri);
  }

  getAll(): Observable<PublicacionEntity[]> {
    return this.http
      .get<URLHttpMultipleDataResponse<PublicacionEntity>>(`${uri}/getAll`)
      .pipe(
        map((res: URLHttpMultipleDataResponse<PublicacionEntity>) => {
          return res.data;
        })
      );
  }

  getUsuarioById(
    id: string
  ): Observable<URLHttpSingleDataResponse<PublicacionEntity>> {
    return this.http.get<URLHttpSingleDataResponse<PublicacionEntity>>(
      `${uri}/${id}`
    );
  }

  toQuestions(publicacion: PublicacionEntity) {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'id',
        label: 'ID',
        value: publicacion.id || '',
        required: true,
      }),
      new TextboxQuestion({
        key: 'tematica',
        label: 'Tematica',
        value: publicacion.tematica || '',
        required: false,
        errorMessage: 'Fill tematica.',
      }),
      new TextboxQuestion({
        key: 'autor',
        label: 'Autor',
        value: publicacion.autor || '',
        required: false,
        errorMessage: 'Fill autor.',
      }),
      new TextboxQuestion({
        key: 'estado',
        label: 'Estado',
        value: publicacion.estado || '',
        required: false,
        errorMessage: 'Fill autor.',
      }),
      new TextboxQuestion({
        key: 'ubicacion',
        label: 'Ubicacion',
        value: publicacion.ubicacion || '',
        required: false,
        errorMessage: 'Fill autor.',
      }),
      new TextboxQuestion({
        key: 'valoracoinMedia',
        label: 'Valoracion media',
        value: publicacion.valoracoinMedia || '',
        required: false,
        errorMessage: 'Fill valoracion media.',
      }),
      new DatePickerQuestion({
        key: 'fecha',
        label: 'Fecha',
        value: publicacion.fecha,
        required: true,
      }),
      new QuestionArray({
        key: 'usuario',
        label: 'Usuario',
        value: [
          new TextboxQuestion({
            key: 'id',
            label: 'ID',
            value: publicacion.usuario? publicacion.usuario.id : '',
            required: true,
          }),
        ],
      }),
    ];
    return questions;
  }
  getQuestionsForNew() {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'tematica',
        label: 'Tematica',
        value: '',
        required: false,
        errorMessage: 'Fill tematica.',
      }),
      new TextboxQuestion({
        key: 'autor',
        label: 'Autor',
        value: '',
        required: false,
        errorMessage: 'Fill autor.',
      }),
      new TextboxQuestion({
        key: 'estado',
        label: 'Estado',
        value: '',
        required: false,
        errorMessage: 'Fill autor.',
      }),
      new TextboxQuestion({
        key: 'ubicacion',
        label: 'Ubicacion',
        value: '',
        required: false,
        errorMessage: 'Fill autor.',
      }),
      new TextboxQuestion({
        key: 'valoracoinMedia',
        label: 'Valoracion media',
        value: '',
        required: false,
        errorMessage: 'Fill valoracion media.',
      }),
      new DatePickerQuestion({
        key: 'fecha',
        label: 'Fecha',
        value: '',
        required: true,
      }),
/*       new QuestionArray({
        key: 'usuario',
        label: 'Usuario',
        value: [
          new TextboxQuestion({
            key: 'id',
            label: 'ID',
            value: '',
            required: false,
          }),
        ],
      }), */
    ];
    return questions;
  }
}
