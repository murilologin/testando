import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClienteDTO } from 'src/app/dto/cliente.dto';
import { ClienteService } from '../../cliente.service';


@Component({
  selector: 'app-clientes-listagem',
  templateUrl: './clientes-listagem.component.html',
  styleUrls: ['./clientes-listagem.component.css']
})
export class ClientesListagemComponent implements OnInit {

  dataSource: MatTableDataSource<ClienteDTO>;
  colunas: string[] = ['nome', 'fantasia', 'codigo', 'edit'];
  filtro = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.filtrar();
  }

  filtrar() {
    this.clienteService.listarTodosClientes(this.filtro)
      .subscribe({
        next: (data) => {
          const clientes = data['content'] as ClienteDTO[];
          this.dataSource = new MatTableDataSource<ClienteDTO>(clientes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filtro = '';
        },
        error: (err) => {
          let msg: string = "Erro obtendo clientes.";
          if (err.status == 401) {msg = 'Não autorizado';}
          this.snackBar.open(msg, "Erro", {duration: 5000});
        }
      })  

  }

  visualizar(id: number) {
    this.router.navigate(['/cliente/visualizar/' + id]);
  }

  editar(id: number) {
    this.router.navigate(['/cliente/cadastro/' + id]);
  }



}
