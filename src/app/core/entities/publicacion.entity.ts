import { ComentarioEntity } from './comentario.entity';
import { CommonEntity } from './common.entity';
import { FotoEntity } from './foto.entity';
import { UsuarioEntity } from './usuario.entity';
import { ValoracionEntity } from './valoracion.entity';

export class PublicacionEntity extends CommonEntity {
  fecha: Date;
  tematica: string;
  estado: string;
  autor: string;
  valoracoinMedia: string;
  usuario: UsuarioEntity;
  valoraciones: ValoracionEntity[];
  comentarios: ComentarioEntity[];
  foto: string;
  latitud: number;
  longitud: number;
}
