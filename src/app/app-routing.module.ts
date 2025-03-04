import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Features/auth/login/login.component';
import { RegisterComponent } from './Features/auth/register/register.component';
import { AdminNavbarComponent } from './Shared/components/admin-navbar/admin-navbar.component';
import { ConducteurNavbarComponent } from './Shared/components/conducteur-navbar/conducteur-navbar.component';
import { GestionConducteurComponent } from './Features/admin/gestion-conducteur/gestion-conducteur.component';
import { AdminModule } from './Features/admin/admin.module';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'cond', component: ConducteurNavbarComponent }, 
  { 
    path: 'admin', 
    loadChildren: () => import('./Features/admin/admin.module').then(m => m.AdminModule),
    data: { role: 'admin' } 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
