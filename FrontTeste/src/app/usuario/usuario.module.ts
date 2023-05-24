import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './component/usuario.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpUtilService } from '../shared/services/http-util.service';
import { UsuarioService } from './usuario.service';
import { UsuariosListagemComponent } from './component/usuarios-listagem/usuarios-listagem.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsuariosVisualizarComponent } from './component/usuarios-visualizar/usuarios-visualizar.component';
import { ConfirmarDialog, UsuariosCadastroComponent } from './component/usuarios-cadastro/usuarios-cadastro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PtBrMatPaginatorIntl } from '../shared/pt-br-mat-paginator-intl';



@NgModule({
  declarations: [
    UsuarioComponent,
    UsuariosListagemComponent,
    UsuariosVisualizarComponent,
    UsuariosCadastroComponent,
    ConfirmarDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    HttpUtilService,
    UsuarioService,
    PtBrMatPaginatorIntl
  ]
  
})
export class UsuarioModule { }
