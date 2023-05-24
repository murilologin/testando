import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProdutoDTO } from 'src/app/dto/produto.dto';
import { ProdutoService } from '../../produto.service';



@Component({
  selector: 'app-produtos-listagem',
  templateUrl: './produtos-listagem.component.html',
  styleUrls: ['./produtos-listagem.component.css']
})
export class ProdutosListagemComponent implements OnInit {

  dataSource: MatTableDataSource<ProdutoDTO>;
  colunas: string[] = ['descricao', 'valorVenda', 'codigo', 'edit'];
  filtro = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.filtrar();
  }

  filtrar() {
    this.produtoService.listarTodosProdutos(this.filtro)
      .subscribe({
        next: (data) => {
          const produtos = data['content'] as ProdutoDTO[];
          this.dataSource = new MatTableDataSource<ProdutoDTO>(produtos);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filtro = '';
        },
        error: (err) => {
          let msg: string = "Erro obtendo produtos.";
          if (err.status == 401) {msg = 'Não autorizado';}
          this.snackBar.open(msg, "Erro", {duration: 5000});
        }
      })  

  }

  visualizar(id: number) {
    this.router.navigate(['/produto/visualizar/' + id]);
  }

  editar(id: number) {
    this.router.navigate(['/produto/cadastro/' + id]);
  }



}
