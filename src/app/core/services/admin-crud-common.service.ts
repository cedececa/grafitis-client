import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { BehaviorSubject } from 'rxjs';
import { CommonEntity } from '../entities/common.entity';
import { map } from "rxjs/operators";
import { URLHttpPageResponse } from '../entities-for-http/url-http-page-response.entity';
import { URLHttpSingleDataResponse } from '../entities-for-http/url-http-single-data-response.entity';

export abstract class AdminCRUDCommonService<
  Entity extends CommonEntity
> {
  constructor(
    protected http: HttpClient,
    protected cls: ClassType<Entity>,
    protected uri: String
  ) {}

  actualEntityId: string = null;
  actualEntity: Entity = null;

  private entitiesStore: { entities: Entity[] } = { entities: [] };
  private _entities = new BehaviorSubject<Entity[]>([]);
  readonly entities = this._entities.asObservable();


  private _loading = new BehaviorSubject<Boolean>(true);
  private _totalItemsInDB = new BehaviorSubject<Number>(0);

  readonly totalItemsInDB = this._totalItemsInDB.asObservable();
  readonly loading = this._loading.asObservable();

  loadEntitiesBy(
    page: number = 0,
    limit: number = 10,
    sort: String = 'createdAt',
    order: 'DESC' | 'ASC' = 'ASC',
    searchKey: String,
    searchValue: String
  ) {
    this._loading.next(true);
    this.http
      .get<URLHttpPageResponse<Entity>>(
        `${this.uri}/page?page=${page}&limit=${limit}&sort=${sort}&order=${order}&searchKey=${searchKey}&searchValue=${searchValue}`
      )
      .subscribe(
        (hpr) => {
          if (hpr.data && hpr.data.items) {
            this.entitiesStore.entities = plainToClass(
              this.cls,
              hpr.data.items
            );

            this._totalItemsInDB.next(hpr.data.meta.totalItems);
            this._entities.next(Object.assign({}, this.entitiesStore).entities);
          }
          this._loading.next(false);
        },
        (error) => console.log('Could not load entities.')
      );
  }

  load(id: Number | String) {
    return this.http
      .get<URLHttpSingleDataResponse<Entity>>(`${this.uri}/${id}`)
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            let notFound = true;

            this.entitiesStore.entities.forEach((item, index) => {
              if (item.id === sdr.data.id) {
                this.entitiesStore.entities[index] = plainToClass(
                  this.cls,
                  sdr.data
                );
                notFound = false;
              }
            });

            if (notFound) {
              this.entitiesStore.entities.push(
                plainToClass(this.cls, sdr.data)
              );
            }

            this._entities.next(Object.assign({}, this.entitiesStore).entities);
          }

          return sdr;
        })
      );
  }

  create(entity: Entity) {
    return this.http
      .post<URLHttpSingleDataResponse<Entity>>(`${this.uri}`, entity)
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.entitiesStore.entities.push(sdr.data);
            this._entities.next(Object.assign({}, this.entitiesStore).entities);
          }

          return sdr;
        })
      );
  }

  update(entity: Entity) {
    return this.http
      .put<URLHttpSingleDataResponse<Entity>>(
        `${this.uri}/${entity.id}`,
        entity
      )
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.entitiesStore.entities.forEach((t, i) => {
              if (t.id === sdr.data.id) {
                this.entitiesStore.entities[i] = plainToClass(
                  this.cls,
                  sdr.data
                );
              }
            });

            this._entities.next(Object.assign({}, this.entitiesStore).entities);
          }

          return sdr;
        })
      );
  }

  remove(id: String | Number) {
    return this.http
      .delete<URLHttpSingleDataResponse<Entity>>(`${this.uri}/${id}`)
      .pipe(
        map((sdr) => {
          if (sdr.code == 200) {
            this.entitiesStore.entities.forEach((t, i) => {
              if (t.id === id) {
                this.entitiesStore.entities.splice(i, 1);
              }
            });
            this._entities.next(Object.assign({}, this.entitiesStore).entities);
          }
          return sdr;
        })
      );
  }
}
