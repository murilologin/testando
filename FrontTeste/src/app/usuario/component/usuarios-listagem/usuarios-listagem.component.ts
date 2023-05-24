import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioDTO } from 'src/app/dto/usuario.dto';
import { UsuarioService } from '../../usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios-listagem',
  templateUrl: './usuarios-listagem.component.html',
  styleUrls: ['./usuarios-listagem.component.css']
})
export class UsuariosListagemComponent implements OnInit {

  dataSource: MatTableDataSource<UsuarioDTO>;
  colunas: string[] = ['username', 'name', 'email', 'edit'];
  filtro = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.filtrar();
  }

  filtrar() {
    this.usuarioService.listarTodosUsuarios(this.filtro)
      .subscribe({
        next: (data) => {
          const usuarios = data['content'] as UsuarioDTO[];
          this.dataSource = new MatTableDataSource<UsuarioDTO>(usuarios);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.filtro = '';
        },
        error: (err) => {
          let msg: string = "Erro obtendo usuários.";
          if (err.status == 401) {msg = 'Não autorizado';}
          this.snackBar.open(msg, "Erro", {duration: 5000});
        }
      })  

  }

  visualizar(username: string) {
    this.router.navigate(['/usuario/visualizar/' + username]);
  }

  editar(username: string) {
    this.router.navigate(['/usuario/cadastro/' + username]);
  }



}
