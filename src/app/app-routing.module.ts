import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserNotLoggedInGuard } from './shared/guards/user-not-logged-in.guard';
import { UserLoggedInGuard } from './shared/guards/user-logged-in.guard';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: MessagesComponent, pathMatch: 'full', canActivate: [UserLoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UserNotLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UserNotLoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
