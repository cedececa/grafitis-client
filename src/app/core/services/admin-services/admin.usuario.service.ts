import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionBase } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-base';
import { TextboxQuestion } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-textbox';
import { DatePickerQuestion } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-date-picker';
import { URLHttpMultipleDataResponse } from '../../entities-for-http/url-http-multiple-data-response.entity';
import { URLHttpSingleDataResponse } from '../../entities-for-http/url-http-single-data-response.entity';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { AdminCRUDCommonService } from '../admin-crud-common.service';
import { QuestionArray } from 'src/app/components/dynamic-form/dynamic-form-question/dynamic-form-question-model/question-json';

const uri = 'usuario';
@Injectable({
  providedIn: 'root',
})
export class AdminUsuarioService extends AdminCRUDCommonService<UsuarioEntity> {
  constructor(http: HttpClient) {
    super(http, UsuarioEntity, uri);
  }

  getAll(): Observable<UsuarioEntity[]> {
    return this.http
      .get<URLHttpMultipleDataResponse<UsuarioEntity>>(`${uri}/getAll`)
      .pipe(
        map((res: URLHttpMultipleDataResponse<UsuarioEntity>) => {
          return res.data;
        })
      );
  }

  getUsuarioById(
    id: string
  ): Observable<URLHttpSingleDataResponse<UsuarioEntity>> {
    return this.http.get<URLHttpSingleDataResponse<UsuarioEntity>>(
      `${uri}/${id}`
    );
  }

  toQuestions(usuario: UsuarioEntity) {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'id',
        label: 'ID',
        value: usuario.id || '',
        required: true,
      }),
      new TextboxQuestion({
        key: 'role',
        label: 'Role',
        value: usuario.role || '',
        required: false,
        errorMessage: 'Fill the role.',
      }),
      new TextboxQuestion({
        key: 'claveHash',
        label: 'key',
        value: usuario.claveHash || '',
        required: false,
        errorMessage: 'Fill the key.',
      }),
      new QuestionArray({
        key: 'perfil',
        label: 'Perfil',
        value: [
          new TextboxQuestion({
            key: 'id',
            label: 'ID',
            value: usuario.perfil.id || '',
            required: true,
          }),
          new TextboxQuestion({
            key: 'nombre',
            label: 'Nombre',
            value: usuario.perfil.nombre || '',
            required: false,
            errorMessage: 'Fill the key.',
          }),
          new TextboxQuestion({
            key: 'apellido',
            label: 'Apellido',
            value: usuario.perfil.apellido || '',
            required: false,
            errorMessage: 'Fill the name.',
          }),
          new TextboxQuestion({
            key: 'apellidoSegundo',
            label: 'Apellido Segundo',
            value: usuario.perfil.apellidoSegundo || '',
            required: false,
            errorMessage: 'Fill the name.',
          }),
          new DatePickerQuestion({
            key: 'fechaNacimiento',
            label: 'Fecha de Nacimiento',
            value: usuario.perfil.fechaNacimiento,
            required: true,
          })
        ],
      }),
    ];
    return questions;
  }
  getQuestionsForNew() {
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'perfil.nombre',
        label: 'Name',
        value: '',
        required: true,
        errorMessage: 'Fill the name.',
      }),
    ];
    return questions;
  }
}
