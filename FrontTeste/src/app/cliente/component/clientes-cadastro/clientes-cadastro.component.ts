import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ClienteDTO } from 'src/app/dto/cliente.dto';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-clientes-cadastro',
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: ['./clientes-cadastro.component.css']
})
export class ClientesCadastroComponent implements OnInit {

  idParam: string = '0';
  cliente: ClienteDTO = new ClienteDTO(0, '', '', '', '');
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private clienteService: ClienteService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('idParam');
    this.gerarForm();
    this.carregarCliente();  
  }

  gerarForm() {
    this.form = this.fb.group({
      id: ['', []],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      fantasia: ['', []],
      documento: ['', []],
      endereco: ['', []]
    });
  }

  carregarCliente() {
    if (this.idParam == '0') {
      this.cliente = new ClienteDTO(0, '', '', '', '');
    } else {
      this.clienteService.buscarCliente(Number(this.idParam))
        .subscribe({
          next: (dados) => {
            this.cliente = dados;
            this.form = this.fb.group(dados);
          },
          error: (err) => {
            console.log(err);
            let msg: string = "Erro obtendo cliente";
            if (err.status == 401) {msg = 'Não autorizado';}
            this.snackBar.open(msg, "Erro", { duration: 5000});
            this.router.navigate(['/cliente']);
          }
        });
    }
  }

  gravarCliente() {
    const cadastro: ClienteDTO = this.form.value;
    if (this.idParam == '0') {
      this.clienteService.adicionarCliente(cadastro)
        .subscribe({
          next: () => {
            this.idParam = this.cliente.id.toString();
            this.snackBar.open('Cliente adicionado com sucesso!', 'Sucesso', {duration:5000});
            this.router.navigate(['/cliente']);
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
      this.clienteService.alterarCliente(cadastro)
        .subscribe({
          next: () => {
            this.idParam = this.cliente.id.toString();
            this.snackBar.open('Cliente alterado com sucesso!', 'Sucesso', {duration:5000});
            this.router.navigate(['/cliente']);
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
          this.excluirCliente();
        }
      }
    });
  }

  excluirCliente() {
    this.clienteService.excluirCliente(Number(this.idParam))
      .subscribe({
        next: () => {
          this.snackBar.open('Cliente excluído com sucesso.', 'Sucesso', {duration: 5000});
          this.router.navigate(['/cliente']);
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
    <h1 mat-dialog-title>Deseja realmente excluir cliente?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

