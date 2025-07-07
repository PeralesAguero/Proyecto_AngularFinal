import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './pages/layout-page/layout-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

//Rutas
const routes: Routes = [
  {//localhost:4200/auth/
    path: '',
    component: LayoutPage,
    children: [
      { path: 'login', component: LoginPage},
      { path: 'register', component: RegisterPage},
      { path: '**', redirectTo: 'login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
