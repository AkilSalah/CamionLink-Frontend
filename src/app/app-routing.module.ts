import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Features/auth/login/login.component';
import { RegisterComponent } from './Features/auth/register/register.component';


const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },

  { 
    path: 'admin', 
    loadChildren: () => import('./Features/admin/admin.module').then(m  => m.AdminModule),
    data: { role: 'admin' } 
  },
  { 
    path: 'conducteur', 
    loadChildren: () => import('./Features/conducteur/conducteur.module').then(c => c.ConducteurModule),
    data: { role: 'conducteur' } 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
