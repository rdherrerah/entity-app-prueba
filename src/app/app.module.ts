import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListaEntidadComponent } from './entidad-information/lista-entidad.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsuarioService } from './login-form/usuario.service';
import { EntidadService } from './entidad-information/entidad.service';
import { RouterModule, Routes } from '@angular/router';
import { EntidadFormComponent } from './entidad-information/entidad-form.component';
import { TipoDocumentoComponent } from './tipo-documento-information/tipo-documento.component';
import { TipoDocumentoService } from './tipo-documento-information/tipo-documento.service';
import { TipoContribuyenteComponent } from './tipo-contribuyente-information/tipo-contribuyente.component';
import { TipoContribuyenteService } from './tipo-contribuyente-information/tipo-contribuyente.service';

const routes: Routes = [
  {path: '', redirectTo: '/loginForm', pathMatch: 'full'},
  {path: 'loginForm',component: LoginFormComponent},
  {path: 'listaEntidad', component: ListaEntidadComponent},
  {path: 'entidadForm/:id',component: EntidadFormComponent},
  {path: 'tipoContribuyente',component: TipoContribuyenteComponent},
  {path: 'tipoDocumento',component: TipoDocumentoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListaEntidadComponent,
    LoginFormComponent,
    EntidadFormComponent,
    TipoDocumentoComponent,
    TipoContribuyenteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UsuarioService,
    EntidadService,
    TipoDocumentoService,
    TipoContribuyenteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
