import { CommonEntity } from './common.entity';
import { PublicacionEntity } from './publicacion.entity';

export class FotoEntity extends CommonEntity {
  url: string;

  publicacion: PublicacionEntity;
}
