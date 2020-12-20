import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLHttpMultipleDataResponse } from 'src/app/core/entities-for-http/url-http-multiple-data-response.entity';
import { ComentarioEntity } from 'src/app/core/entities/comentario.entity';
import { PublicacionEntity } from 'src/app/core/entities/publicacion.entity';
const uri = 'publicacion';

@Injectable({
  providedIn: 'root',
})
export class MapaGrafitisService {
  private _entities = new BehaviorSubject<
    {
      position: {
        lat: number;
        lng: number;
      };
      label: {
        color: string;
        text: string;
      };
      title: string;
    }[]
  >([]);
  readonly entities$ = this._entities.asObservable();
  private entities: {
    position: {
      lat: number;
      lng: number;
    };
    label: {
      color: string;
      text: string;
    };
    title: string;
  }[] = [];

  constructor(protected http: HttpClient) {
    this.getAll().subscribe()
  }

  getAll(): Observable<PublicacionEntity[]> {
    return this.http
      .get<URLHttpMultipleDataResponse<PublicacionEntity>>(`${uri}`)
      .pipe(
        map((res: URLHttpMultipleDataResponse<PublicacionEntity>) => {
          this.entities = this.transformToGrafitis(res.data);
          this._entities.next(this.entities);
          return res.data;
        })
      );
  }
  filterByAutor(autor: string): Observable<PublicacionEntity[]> {
    return this.http
      .get<URLHttpMultipleDataResponse<PublicacionEntity>>(
        `${uri}/autor/${autor}`
      )
      .pipe(
        map((res: URLHttpMultipleDataResponse<PublicacionEntity>) => {
          this.entities = this.transformToGrafitis(res.data);
          this._entities.next(this.entities);
          return res.data;
        })
      );
  }
  getComentariosByPublicacionId(
    publicacionId: number
  ): Observable<ComentarioEntity[]> {
    return this.http
      .get<URLHttpMultipleDataResponse<ComentarioEntity>>(
        `${uri}/${publicacionId}/comentario`
      )
      .pipe(
        map((res: URLHttpMultipleDataResponse<ComentarioEntity>) => {
          return res.data;
        })
      );
  }
  private transformToGrafitis(publicaciones: PublicacionEntity[]) {
    let mapa_gratifis = [];
    publicaciones.forEach((element) => {
      mapa_gratifis.push(this.transformToGrafiti(element));
    });
    return mapa_gratifis;
  }
  private transformToGrafiti(element: PublicacionEntity) {
    return {
      publicacion: element,
      position: {
        lat: element.latitud,
        lng: element.longitud,
      },
      label: {
        color: 'white',
        fontSize: '20px',
        text: `${element.autor}`,
      },
      title: element.autor,
    };
  }
  addEntity(toBeAdded: PublicacionEntity) {
    this.entities.push(this.transformToGrafiti(toBeAdded));
    this._entities.next(this.entities);
  }
}
