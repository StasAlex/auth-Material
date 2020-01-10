import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInService, AuthOutService } from './services/auth-guard.service';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthOutService]
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'logout',
    component: HomeComponent,
    canActivate: [AuthOutService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthInService]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
