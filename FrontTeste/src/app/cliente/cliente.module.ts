import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpUtilService } from '../shared/services/http-util.service';
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
import { ClientesCadastroComponent, ConfirmarDialog } from './component/clientes-cadastro/clientes-cadastro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteService } from './cliente.service';
import { ClientesVisualizarComponent } from './component/clientes-visualizar/clientes-visualizar.component';
import { ClienteComponent } from './component/cliente.component';
import { ClientesListagemComponent } from './component/clientes-listagem/clientes-listagem.component';



@NgModule({
  declarations: [
    ClienteComponent,
    ClientesListagemComponent,
    ClientesVisualizarComponent,
    ClientesCadastroComponent,
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
    ClienteService
  ]
  
})
export class ClienteModule { }
