import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ProdutoDTO } from 'src/app/dto/produto.dto';
import { ProdutoService } from '../../produto.service';


@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {

  idParam: string = '0';
  produto: ProdutoDTO = new ProdutoDTO(0, '', '', 0, 0, 0);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private produtoService: ProdutoService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('idParam');
    this.gerarForm();
    this.carregarProduto();  
  }

  gerarForm() {
    this.form = this.fb.group({
      id: ['', []],
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      codigoBarras: ['', []],
      valorVenda: ['', []],
      pesoBruto: ['', []],
      pesoLiquido: ['', []]
    });
  }

  carregarProduto() {
    if (this.idParam == '0') {
      this.produto = new ProdutoDTO(0, '', '', 0, 0, 0);
    } else {
      this.produtoService.buscarProduto(Number(this.idParam))
        .subscribe({
          next: (dados) => {
            this.produto = dados;
            this.form = this.fb.group(dados);
          },
          error: (err) => {
            console.log(err);
            let msg: string = "Erro obtendo produto";
            if (err.status == 401) {msg = 'Não autorizado';}
            this.snackBar.open(msg, "Erro", { duration: 5000});
            this.router.navigate(['/produto']);
          }
        });
    }
  }

  gravarProduto() {
    const cadastro: ProdutoDTO = this.form.value;
    if (this.idParam == '0') {
      this.produtoService.adicionarProduto(cadastro)
        .subscribe({
          next: () => {
            this.idParam = this.produto.id.toString();
            this.snackBar.open('Produto adicionado com sucesso!', 'Sucesso', {duration:5000});
            this.router.navigate(['/produto']);
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
      this.produtoService.alterarProduto(cadastro)
        .subscribe({
          next: () => {
            this.idParam = this.produto.id.toString();
            this.snackBar.open('Produto alterado com sucesso!', 'Sucesso', {duration:5000});
            this.router.navigate(['/produto']);
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
          this.excluirProduto();
        }
      }
    });
  }

  excluirProduto() {
    this.produtoService.excluirProduto(Number(this.idParam))
      .subscribe({
        next: () => {
          this.snackBar.open('Produto excluído com sucesso.', 'Sucesso', {duration: 5000});
          this.router.navigate(['/produto']);
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
    <h1 mat-dialog-title>Deseja realmente excluir produto?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

