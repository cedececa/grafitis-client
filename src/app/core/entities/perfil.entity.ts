import { CommonEntity } from './common.entity'
import { UsuarioEntity } from './usuario.entity'

export class PerfilEntity extends CommonEntity {
  usuario: UsuarioEntity
  avatarUrl: string
  apellido: string
  apellidoSegundo: string
  nombre: string
  fechaNacimiento: string
}
