import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
// Caso tenha uma tela "Home" depois do login:
//import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //{ path: 'home', component: HomeComponent } // opcional
];
