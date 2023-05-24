import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ClienteDTO } from '../dto/cliente.dto';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly PATH: string = 'cliente';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listarTodosClientes(nome: string): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH + `?nome=${nome}`, this.httpUtil.headers()
    );
  }

  buscarCliente(id: number): Observable<any> {
    return this.http.get(environment.baseApiUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }

  adicionarCliente(cliente: ClienteDTO): Observable<any> {
    return this.http.post(environment.baseApiUrl + this.PATH, cliente, this.httpUtil.headers());
  }

  alterarCliente(cliente: ClienteDTO): Observable<any> {
    return this.http.put(environment.baseApiUrl + this.PATH + '/' + cliente.id,
       cliente, this.httpUtil.headers());
  }

  excluirCliente(id: number): Observable<any> {
    return this.http.delete(environment.baseApiUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }


}
