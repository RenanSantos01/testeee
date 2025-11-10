import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  private apiUrl = 'http://localhost:3001/users'; // ✅ API rodando na porta 3001

  constructor(private router: Router, private http: HttpClient) {
    // ✅ Se o usuário já estiver logado, redireciona automaticamente
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.http
      .get<any[]>(`${this.apiUrl}?username=${this.username}&password=${this.password}`)
      .subscribe({
        next: (users) => {
          if (users.length > 0) {
            // ✅ Armazena o login no navegador
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', this.username);

            // ✅ Redireciona para /home
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Usuário ou senha incorretos!';
          }
        },
        error: () => {
          this.errorMessage = 'Erro ao conectar à API.';
        }
      });
  }
}
