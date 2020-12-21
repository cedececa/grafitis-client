import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/authentication/authentication.guard';
import { GoogleLoginFailureComponent } from './pages/login/google-login-failure/google-login-failure.component';
import { GoogleLoginSuccessComponent } from './pages/login/google-login-success/google-login-success.component';
/* import { AuthenticationGuard } from "./core/guards/authentication/authentication.guard";
 */

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  /*   {
    path: "",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule)
  }, */
  { path: '', redirectTo: '/usuario/mapa-grafitis', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'google-login-success/:token',
    component: GoogleLoginSuccessComponent,
  },
  {
    path: 'google-login-failure',
    component: GoogleLoginFailureComponent,
  },
  {
    path: 'usuario',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/usuario/usuario-layout.module').then(
        (m) => m.UsuarioLayoutModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  /*   { path: "**", redirectTo: "/not-found404" }
   */
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
