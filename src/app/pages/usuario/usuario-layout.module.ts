import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MisGrafitisComponent } from './mis-grafitis/mis-grafitis.component';
import { ModifyMyGraffitiComponent } from './mis-grafitis/modify-my-graffiti/modify-my-graffiti.component';


@NgModule({
  /*   declarations: [UsuarioLayoutComponent], */
  imports: [CommonModule, UsuarioRoutingModule],
})
export class UsuarioLayoutModule {}
