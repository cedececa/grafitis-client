import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  // { path: '', redirectTo: 'usuario' },
  // { path: '', component: AdminComponent, children: [] },
  // { path: 'usuario', component: UsuarioComponent },
  // { path: 'publicacion', component: PublicacionComponent },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'usuario', component: UsuarioComponent },
      { path: 'publicacion', component: PublicacionComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
