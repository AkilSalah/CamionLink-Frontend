import { NgModule } from "@angular/core";
import { GestionConducteurComponent } from "./gestion-conducteur/gestion-conducteur.component";
import { CommonModule, DatePipe } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from "../../Shared/components/admin-navbar/admin-navbar.component";
import { TruckComponent } from "./truck/truck.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DepenseComponent } from './depense/depense.component';

@NgModule({
    declarations: [
        GestionConducteurComponent,
        AdminLayoutComponent,
        AdminNavbarComponent,
        TruckComponent,
        DepenseComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule      
    ],
    providers: [
        DatePipe 
    ]
})
export class AdminModule {}