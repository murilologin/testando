import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './autenticacao/login-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './autenticacao/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioRoutingModule } from './usuario/usuario-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteRoutingModule } from './cliente/cliente-routing.module';
import { RouteGuard } from './shared/services/route-guard.services';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoRoutingModule } from './produto/produto-routing.module';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PtBrMatPaginatorIntl } from './shared/pt-br-mat-paginator-intl';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    LoginModule,
    LoginRoutingModule,
    DashboardModule,
    DashboardRoutingModule,
    UsuarioModule,
    UsuarioRoutingModule,
    ClienteModule,
    ClienteRoutingModule,
    ProdutoModule,
    ProdutoRoutingModule,
    

    AppRoutingModule
  ],
  providers: [
    RouteGuard,
    PtBrMatPaginatorIntl,
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
