
import { CommonEntity } from './common.entity'
import { PublicacionEntity } from './publicacion.entity'
import { UsuarioEntity } from './usuario.entity'

export class ComentarioEntity extends CommonEntity {
  contenido: string
  usuario: UsuarioEntity
  publicacion: PublicacionEntity
}
