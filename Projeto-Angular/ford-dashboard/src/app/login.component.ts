import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Importa aqui

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Adiciona o FormsModule aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === '1234') {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuário ou senha incorretos!';
    }
  }
}
