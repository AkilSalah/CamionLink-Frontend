import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConducteurLayoutComponent } from "./conducteur-layout/conducteur-layout.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { MissionComponent } from "./mission/mission.component";


const routes : Routes = [
    {
      path: '', 
      component: ConducteurLayoutComponent, 
      children: [
        { path: 'home', component: HomeComponent }, 
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      ]
    },
    {
        path: '', 
        component: ConducteurLayoutComponent, 
        children: [
          { path: 'profile', component: ProfileComponent }, 
        ]
     },
     {
      path: '', 
      component: ConducteurLayoutComponent, 
      children: [
        { path: 'conducteurMission', component: MissionComponent }, 
      ]
    },
]


 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConducteurRoutingModule { }