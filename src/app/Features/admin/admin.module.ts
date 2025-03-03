import { NgModule } from "@angular/core";
import { GestionConducteurComponent } from "./gestion-conducteur/gestion-conducteur.component";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from "../../Shared/components/admin-navbar/admin-navbar.component";

@NgModule({
    declarations: [
        GestionConducteurComponent,
        AdminLayoutComponent,
        AdminNavbarComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
      
    ],
})
export class AdminModule {}