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
import { StoreModule } from '@ngrx/store';
import { truckReducer } from './Features/store/reducers/truck.reducer';
import { TruckEffects } from './Features/store/effects/truck.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { cargaisonReducer } from './Features/store/reducers/cargaison.reducer';
import { CargaisonEffects } from './Features/store/effects/cargaison.effects';
import { ConducteurModule } from './Features/conducteur/conducteur.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    TrajetComponent,
    CargaisonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ConducteurModule,
    HttpClientModule,
    StoreModule.forRoot({ trucks: truckReducer,cargaisons : cargaisonReducer }),
    EffectsModule.forRoot([TruckEffects,CargaisonEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
    })
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
