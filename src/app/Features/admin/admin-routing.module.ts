import { RouterModule, Routes } from "@angular/router";
import { GestionConducteurComponent } from "./gestion-conducteur/gestion-conducteur.component";
import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { TruckComponent } from "./truck/truck.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CargaisonComponent } from "./cargaison/cargaison.component";

const routes: Routes = [
    {
      path: '', 
      component: AdminLayoutComponent, 
      children: [
        { path: 'dashboard', component: DashboardComponent }, 
      ]
    },
    {
        path: '', 
        component: AdminLayoutComponent, 
        children: [
          { path: 'conducteurs', component: GestionConducteurComponent }, 
        ]
      },
     {
        path: '', 
        component: AdminLayoutComponent, 
        children: [
          { path: 'camions', component: TruckComponent }, 
        ]
      },
      {
        path: '', 
        component: AdminLayoutComponent, 
        children: [
          { path: 'cargaison', component: CargaisonComponent }, 
        ]
      }  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }