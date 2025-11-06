import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home/home.component'; // ✅ importe o componente Home

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent } // ✅ rota ativa
];
