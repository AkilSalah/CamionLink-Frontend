import { NgModule } from "@angular/core";
import { ConducteurNavbarComponent } from "../../Shared/components/conducteur-navbar/conducteur-navbar.component";
import { CommonModule } from "@angular/common";
import { ConducteurLayoutComponent } from './conducteur-layout/conducteur-layout.component';
import { ConducteurRoutingModule } from "./conducteur-routing.module";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
    declarations: [
        ConducteurNavbarComponent,
        ConducteurLayoutComponent,
        HomeComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ConducteurRoutingModule

    ],
    providers: [
    ]
})
export class ConducteurModule {}