import { NgModule } from '@angular/core';
import { MapaGrafitisComponent } from './mapa-grafitis/mapa-grafitis.component';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLayoutComponent } from './usuario-layout/usuario-layout.component';
import { MisGrafitisComponent } from './mis-grafitis/mis-grafitis.component';

const routes: Routes = [
  // { path: '', redirectTo: 'usuario' },
  // { path: '', component: AdminComponent, children: [] },
  // { path: 'usuario', component: UsuarioComponent },
  // { path: 'publicacion', component: PublicacionComponent },
  {
    path: '',
    component: UsuarioLayoutComponent,
    children: [
      { path: 'mapa-grafitis', component: MapaGrafitisComponent },
      { path: 'mis-grafitis', component: MisGrafitisComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
