import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ProdutoDTO } from '../dto/produto.dto';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly PATH: string = 'produto';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listarTodosProdutos(descricao: string): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH + `?descricao=${descricao}`, this.httpUtil.headers()
    );
  }

  buscarProduto(id: number): Observable<any> {
    return this.http.get(environment.baseApiUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }

  adicionarProduto(produto: ProdutoDTO): Observable<any> {
    return this.http.post(environment.baseApiUrl + this.PATH, produto, this.httpUtil.headers());
  }

  alterarProduto(produto: ProdutoDTO): Observable<any> {
    return this.http.put(environment.baseApiUrl + this.PATH + '/' + produto.id,
       produto, this.httpUtil.headers());
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(environment.baseApiUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }


}
