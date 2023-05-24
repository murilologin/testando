import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from '../shared/services/http-util.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UsuarioDTO } from '../dto/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly PATH: string = 'users';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listarTodosUsuarios(nome: string): Observable<any> {
    return this.http.get(
      environment.baseApiUrl + this.PATH + `?name=${nome}`, this.httpUtil.headers()
    );
  }

  buscarUsuario(username: string): Observable<any> {
    return this.http.get(environment.baseApiUrl + this.PATH + '/' + username, this.httpUtil.headers());
  }

  adicionarUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.post(environment.baseApiUrl + this.PATH, usuario, this.httpUtil.headers());
  }

  alterarUsuario(usuario: UsuarioDTO): Observable<any> {
    return this.http.put(environment.baseApiUrl + this.PATH + '/' + usuario.username,
       usuario, this.httpUtil.headers());
  }

  excluirUsuario(username: string): Observable<any> {
    return this.http.delete(environment.baseApiUrl + this.PATH + '/' + username, this.httpUtil.headers());
  }


}
