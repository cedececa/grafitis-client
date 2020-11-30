import { CommonEntity } from './common.entity';
import { PublicacionEntity } from './publicacion.entity';
import { UsuarioEntity } from './usuario.entity';

export class ValoracionEntity extends CommonEntity {
  punto: number;
  usuario: UsuarioEntity;
  publicacion: PublicacionEntity;
}
