import { RouterModule, Routes } from "@angular/router";
import { GestionConducteurComponent } from "./gestion-conducteur/gestion-conducteur.component";
import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { TruckComponent } from "./truck/truck.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CargaisonComponent } from "./cargaison/cargaison.component";
import { TrajetComponent } from "./trajet/trajet.component";
import { DepenseComponent } from "./depense/depense.component";
import { PanneManagementComponent } from "./panne-management/panne-management.component";

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
          { path: 'trajets', component: TrajetComponent }, 
        ]
    },
    {
        path: '', 
        component: AdminLayoutComponent, 
        children: [
          { path: 'cargaisons', component: CargaisonComponent }, 
        ]
    },
    {
      path: '', 
      component: AdminLayoutComponent, 
      children: [
        { path: 'Pannes', component: PanneManagementComponent }, 
      ]
  },
    {
      path: '', 
      component: AdminLayoutComponent, 
      children: [
        { path: 'depenses', component: DepenseComponent }, 
      ]
  }  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }