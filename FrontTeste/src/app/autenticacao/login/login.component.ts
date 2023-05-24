import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.geraForm();
    setTimeout(() => {
      this.app.drawer.close();
    }, 500);
  }

  geraForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.login();
  }

  login() {
    if (this.form.invalid) {
      //this.notification.error('Dados inválidos');
      return;
    }
    
    const login: Login = this.form.value;
    this.loginService.logar(login)
      .subscribe({
        next: (data) => {
          const token = data.token;
          localStorage['token'] = token;
          this.app.drawer.open();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          let msg: string = "Tente novamente em instantes.";
          if (err['status'] == 401) {
            msg = "Usuário/senha inválido(s)";
          }
          this.snackBar.open(msg, "Erro", {duration: 5000});
        }
      })
  }

}
