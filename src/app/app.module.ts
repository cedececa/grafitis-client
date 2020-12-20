import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { LoginComponent } from './pages/login/login.component';
import { NzZorroModule } from './configs/nz-zorro.module';
import { AppRoutingModule } from './app.routing.module';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { URLBaseInterceptor } from './core/interceptor/url-base.interceptor';
import { PipesModule } from './core/pipe/pipes.module';
import { UsuarioComponent } from './pages/admin/usuario/usuario.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { PublicacionComponent } from './pages/admin/publicacion/publicacion.component';
import { AdminComponent } from './pages/admin/admin/admin.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { TableBaseUpdateCreateComponent } from './components/table-base-update-create/table-base-update-create.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaGrafitisComponent } from './pages/usuario/mapa-grafitis/mapa-grafitis.component';
import { UsuarioLayoutComponent } from './pages/usuario/usuario-layout/usuario-layout.component';
import { CreateGrafitisComponent } from './pages/usuario/mapa-grafitis/create-grafitis/create-grafitis.component';
import { UploadImageSingleComponent } from './components/upload-image-single/upload-image-single.component';
import { GrafitisDetailComponent } from './pages/usuario/mapa-grafitis/grafitis-detail/grafitis-detail.component';
import { LoadingSpinModalComponent } from './components/loading-spin-modal/loading-spin-modal.component';
import { MisGrafitisComponent } from './pages/usuario/mis-grafitis/mis-grafitis.component';
import { ModifyMyGraffitiComponent } from './pages/usuario/mis-grafitis/modify-my-graffiti/modify-my-graffiti.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageContainerComponent,
    UsuarioComponent,
    PublicacionComponent,
    AdminComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    TableBaseUpdateCreateComponent,
    UsuarioLayoutComponent,
    MapaGrafitisComponent,
    CreateGrafitisComponent,
    UploadImageSingleComponent,
    GrafitisDetailComponent,
    LoadingSpinModalComponent,
    MisGrafitisComponent,
    ModifyMyGraffitiComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NzZorroModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PipesModule,
    Ng2ImgMaxModule,
    GoogleMapsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      // insertamos nuestro interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: URLBaseInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
