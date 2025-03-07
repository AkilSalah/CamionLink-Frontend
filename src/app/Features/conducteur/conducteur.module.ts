import { NgModule } from "@angular/core";
import { ConducteurNavbarComponent } from "../../Shared/components/conducteur-navbar/conducteur-navbar.component";
import { CommonModule } from "@angular/common";
import { ConducteurLayoutComponent } from './conducteur-layout/conducteur-layout.component';
import { ConducteurRoutingModule } from "./conducteur-routing.module";
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule} from "@angular/forms";
import { FooterComponent } from "../../Shared/components/footer/footer.component";



@NgModule({
    declarations: [
        ConducteurNavbarComponent,
        ConducteurLayoutComponent,
        FooterComponent,
        HomeComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ConducteurRoutingModule,
        FormsModule
    ],
    providers: [
    ]
})
export class ConducteurModule {}