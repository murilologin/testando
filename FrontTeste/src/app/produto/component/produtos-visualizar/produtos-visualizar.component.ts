import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoDTO } from 'src/app/dto/produto.dto';
import { ProdutoService } from '../../produto.service';



@Component({
  selector: 'app-produtos-visualizar',
  templateUrl: './produtos-visualizar.component.html',
  styleUrls: ['./produtos-visualizar.component.css']
})
export class ProdutosVisualizarComponent implements OnInit {

  idParam: string = '0';
  produto: ProdutoDTO = new ProdutoDTO(0, '', '', 0, 0, 0);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private produtoService: ProdutoService
    ) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('idParam');
    this.carregarProduto();  
  }

  carregarProduto() {
    this.produtoService.buscarProduto(Number(this.idParam))
      .subscribe({
        next: (dados) => {
          this.produto = dados;
        },
        error: (err) => {
          let msg: string = "Erro obtendo produto";
          if (err.status == 401) {msg = 'Não autorizado';}
          this.snackBar.open(msg, "Erro", { duration: 5000});
          this.router.navigate(['/produto']);
        }
      })
  }

  editar(id: number) {
    this.router.navigate(['/produto/cadastro/' + id]);
  }

}
