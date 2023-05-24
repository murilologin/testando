import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (localStorage['token']) {
      httpHeaders = httpHeaders.set(
        'Authorization', 'Bearer ' + localStorage['token']
      );
    } else {
      this.snackbar.open('Token expirado. Faça o login novamente', 'Atenção', { duration: 5000});
      this.router.navigate(['/login']);
    }
    //console.log(JSON.stringify(httpHeaders));
    return { headers: httpHeaders };
  }

  obterIdUsuario(): string {
    if (!localStorage['token']) {
      return '';
    }
    const dadosUsuario = this.obterDadosUsuario();
    return dadosUsuario ? dadosUsuario.id : '';
  }

  obterDadosUsuario() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(window.atob(localStorage['token'].split('.')[1]));
  }

  temToken(): boolean {
    return localStorage['token'];
  }



}
