import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/dto/usuario.dto';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-usuarios-visualizar',
  templateUrl: './usuarios-visualizar.component.html',
  styleUrls: ['./usuarios-visualizar.component.css']
})
export class UsuariosVisualizarComponent implements OnInit {

  userParam: string = '';
  usuario: UsuarioDTO = new UsuarioDTO('', '', '', '');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.userParam = this.route.snapshot.paramMap.get('userParam');
    this.carregarUsuario();  
  }

  carregarUsuario() {
    this.usuarioService.buscarUsuario(this.userParam)
      .subscribe({
        next: (dados) => {
          this.usuario = dados;
        },
        error: (err) => {
          let msg: string = "Erro obtendo usuário";
          if (err.status == 401) {msg = 'Não autorizado';}
          this.snackBar.open(msg, "Erro", { duration: 5000});
          this.router.navigate(['/usuario']);
        }
      })
  }

  editar(username: string) {
    this.router.navigate(['/usuario/cadastro/' + username]);
  }

}
