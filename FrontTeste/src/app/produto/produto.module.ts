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
import { MatDialogModule } from '@angular/material/dialog';
import { ProdutoService } from './produto.service';
import { ConfirmarDialog, ProdutosCadastroComponent } from './component/produtos-cadastro/produtos-cadastro.component';
import { ProdutoComponent } from './component/produto.component';
import { ProdutosVisualizarComponent } from './component/produtos-visualizar/produtos-visualizar.component';
import { ProdutosListagemComponent } from './component/produtos-listagem/produtos-listagem.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';




@NgModule({
  declarations: [
    ProdutoComponent,
    ProdutosListagemComponent,
    ProdutosVisualizarComponent,
    ProdutosCadastroComponent,
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
    MatDialogModule,
    CurrencyMaskModule
  ],
  providers: [
    HttpUtilService,
    ProdutoService
  ]
  
})
export class ProdutoModule { }
