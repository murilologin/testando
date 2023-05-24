import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { environment } from './environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;

  showSideBar = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
      setTimeout(() => {
        if (this.logado()) {
          this.drawer.open();
        } else {
          this.drawer.close();
        }
      }, 500);
  }

  mostrarMenu() {
    this.showSideBar = true; 
  }

  logado(): boolean {
    return localStorage['token'];
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  usuarios() {
    this.router.navigate(['/usuario']);
  }

  clientes() {
    this.router.navigate(['/cliente'])
  }

  produtos() {
    this.router.navigate(['/produto'])
  }

  documentacao() {
    window.open(environment.baseUrl + 'swagger-ui.html', '_blank');
  }

  sair() {
    this.drawer.close();
    this.showSideBar = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
