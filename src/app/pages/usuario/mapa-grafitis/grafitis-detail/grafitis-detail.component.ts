import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { ComentarioEntity } from 'src/app/core/entities/comentario.entity';
import { PublicacionEntity } from 'src/app/core/entities/publicacion.entity';
import { UsuarioPublicacionService } from 'src/app/core/services/usuario-services/usuario-publicacion.service';
import { MapaGrafitisService } from '../mapa-grafitis.service';
import { mergeMap, map, take } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-grafitis-detail',
  templateUrl: './grafitis-detail.component.html',
  styleUrls: ['./grafitis-detail.component.css'],
})
export class GrafitisDetailComponent implements OnInit {
  @Input() publicacion: PublicacionEntity;
  constructor(
    private mapaGrafitisService: MapaGrafitisService,
    private usuarioPublicacionService: UsuarioPublicacionService,
    private autenticactionService: AuthenticationService
  ) {}

  private _comentarios: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  comentarios$: Observable<
    ComentarioEntity[]
  > = this._comentarios.asObservable();
  ngOnInit(): void {
    this.mapaGrafitisService
      .getComentariosByPublicacionId(this.publicacion.id)
      .subscribe((all) => {
        this._comentarios.next(all);
      });
  }

  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };
  inputValue = '';
  handleSubmit(): void {
    let newComentario = {
      contenido: this.inputValue,
    };
    this.autenticactionService.usuarioLogueado$.subscribe((usuario) => {
      console.log(usuario)
      this.usuarioPublicacionService
        .comment(
          usuario.id,
          this.publicacion.id,
          newComentario as ComentarioEntity
        )
        .subscribe((newComentario) => {
          this.comentarios$.pipe(take(1)).subscribe((val) => {
            //console.log(val);
            const newArr = [newComentario, ...val];
            this._comentarios.next(newArr);

            var myDiv = document.getElementById('div-comentarios');
            myDiv.scrollTop = 0;
            this.inputValue = '';
          });
        });
    });


  }
}
