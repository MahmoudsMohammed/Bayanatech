import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RetrivePasswordComponent } from './components/retrive-password/retrive-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'retrive-password', component: RetrivePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
