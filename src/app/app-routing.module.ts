import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Features/auth/login/login.component';
import { RegisterComponent } from './Features/auth/register/register.component';
import { UnauthorizedComponent } from './Features/unauthorized/unauthorized.component';
import { RoleGuard } from './Core/guards/role.guard';


const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },

  { 
    path: 'admin', 
    loadChildren: () => import('./Features/admin/admin.module').then(m  => m.AdminModule),
    canActivate: [RoleGuard],
    data: { role: 'ROLE_ADMIN' } 
  },
  { 
    path: 'conducteur', 
    loadChildren: () => import('./Features/conducteur/conducteur.module').then(c => c.ConducteurModule),
    canActivate: [RoleGuard],
    data: { role: 'ROLE_CONDUCTEUR' } 
  },
  { path: 'unauthorized', component: UnauthorizedComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
