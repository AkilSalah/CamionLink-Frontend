import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Features/auth/register/register.component';
import { LoginComponent } from './Features/auth/login/login.component';
import { DashboardComponent } from './Features/admin/dashboard/dashboard.component';
import { FormsModule, NgModel } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminNavbarComponent } from './Shared/components/admin-navbar/admin-navbar.component';
import { ConducteurNavbarComponent } from './Shared/components/conducteur-navbar/conducteur-navbar.component';
import { FooterComponent } from './Shared/components/footer/footer.component';
import { TruckComponent } from './Features/admin/truck/truck.component';
import { TrajetComponent } from './Features/admin/trajet/trajet.component';
import { CargaisonComponent } from './Features/admin/cargaison/cargaison.component';
import { AuthInterceptor } from './Core/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ConducteurNavbarComponent,
    FooterComponent,
    TrajetComponent,
    CargaisonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
