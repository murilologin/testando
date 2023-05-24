import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioDTO } from 'src/app/dto/usuario.dto';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-usuarios-cadastro',
  templateUrl: './usuarios-cadastro.component.html',
  styleUrls: ['./usuarios-cadastro.component.css']
})
export class UsuariosCadastroComponent implements OnInit {

  userParam: string = '';
  usuario: UsuarioDTO = new UsuarioDTO('', '', '', '');
  @ViewChild(MatSelect, {static: true}) matSelect: MatSelect;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private usuarioService: UsuarioService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.userParam = this.route.snapshot.paramMap.get('userParam');
    this.carregarUsuario();  
  }

  gerarForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  carregarUsuario() {
    if (this.userParam == '0') {
      this.usuario = new UsuarioDTO('', '', '', '');
    } else {
      this.usuarioService.buscarUsuario(this.userParam)
        .subscribe({
          next: (dados) => {
            this.usuario = dados;
            this.form = this.fb.group(dados);
          },
          error: (err) => {
            console.log(err);
            let msg: string = "Erro obtendo usuário";
            if (err.status == 401) {msg = 'Não autorizado';}
            this.snackBar.open(msg, "Erro", { duration: 5000});
            this.router.navigate(['/usuario']);
          }
        });
    }
  }

  gravarUsuario() {
    const cadastro: UsuarioDTO = this.form.value;
    if (this.userParam == '0') {
      this.usuarioService.adicionarUsuario(cadastro)
        .subscribe({
          next: () => {
            this.userParam = this.usuario.username;
            this.snackBar.open('Usuário adicionado com sucesso!', 'Sucesso', {duration:5000});
            this.router.navigate(['/usuario']);
          },
          error: (err) => {
            let msg: string = 'Ocorreu um erro inesperado';
            if (err.status == 400) {
              msg = JSON.stringify(err);
            }
            if (err.status == 401) {
              msg = 'Operação não autorizada';
            }
            this.snackBar.open(msg, 'Erro', {duration: 5000});
          }
        })
    } else {
      this.usuarioService.alterarUsuario(cadastro)
        .subscribe({
          next: () => {
            this.userParam = this.usuario.username;
            this.snackBar.open('Usuário alterado com sucesso!', 'Sucesso', {duration:5000});
            this.router.navigate(['/usuario']);
          },
          error: (err) => {
            let msg: string = 'Ocorreu um erro inesperado';
            if (err.status == 400) {
              msg = JSON.stringify(err);
            }
            if (err.status == 401) {
              msg = 'Operação não autorizada';
            }
            this.snackBar.open(msg, 'Erro', {duration: 5000});
          }
        })
    }

  }

  excluirDialog() {
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe({
      next: remover => {
        if (remover) {
          this.excluirUsuario();
        }
      }
    });
  }

  excluirUsuario() {
    this.usuarioService.excluirUsuario(this.userParam)
      .subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso.', 'Sucesso', {duration: 5000});
          this.router.navigate(['/usuario']);
        },
        error: (err) => {
          let msg: string = 'Ocorreu um erro inesperado';
          if (err.status == 400) {
            msg = JSON.stringify(err);
          }
          if (err.status == 401) {
            msg = 'Operação não autorizada';
          }
          this.snackBar.open(msg, 'Erro', {duration: 5000});
        }
      })
  }

}

@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente excluir usuário?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

