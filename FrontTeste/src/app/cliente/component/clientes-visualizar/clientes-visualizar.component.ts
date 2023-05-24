import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteDTO } from 'src/app/dto/cliente.dto';
import { ClienteService } from '../../cliente.service';


@Component({
  selector: 'app-clientes-visualizar',
  templateUrl: './clientes-visualizar.component.html',
  styleUrls: ['./clientes-visualizar.component.css']
})
export class ClientesVisualizarComponent implements OnInit {

  idParam: string = '0';
  cliente: ClienteDTO = new ClienteDTO(0, '', '', '', '');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private clienteService: ClienteService
    ) { }

  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('idParam');
    this.carregarCliente();  
  }

  carregarCliente() {
    this.clienteService.buscarCliente(Number(this.idParam))
      .subscribe({
        next: (dados) => {
          this.cliente = dados;
        },
        error: (err) => {
          let msg: string = "Erro obtendo cliente";
          if (err.status == 401) {msg = 'Não autorizado';}
          this.snackBar.open(msg, "Erro", { duration: 5000});
          this.router.navigate(['/cliente']);
        }
      })
  }

  editar(id: number) {
    this.router.navigate(['/cliente/cadastro/' + id]);
  }

}
