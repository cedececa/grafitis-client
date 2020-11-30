import { ComentarioEntity } from './comentario.entity';
import { CommonEntity } from './common.entity';
import { PerfilEntity } from './perfil.entity';
import { PublicacionEntity } from './publicacion.entity';
import { ValoracionEntity } from './valoracion.entity';

export class UsuarioEntity extends CommonEntity {
  role: string;
  claveHash: string;
  correo: string;
  perfil: PerfilEntity;
  valoraciones: ValoracionEntity[];
  comentarios: ComentarioEntity[];
  publicaciones: PublicacionEntity[];
}
