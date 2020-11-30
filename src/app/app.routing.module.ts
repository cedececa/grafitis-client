import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import { AuthenticationGuard } from "./core/guards/authentication/authentication.guard";
 */

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  /*   {
    path: "",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule)
  }, */
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    /* canActivate: [AuthenticationGuard], */
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
