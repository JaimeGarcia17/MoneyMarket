import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./app-material/app-material.module";
import { LoginComponent } from "./components/login/login.component";
import { CarteraAccionesComponent } from "./components/cartera-acciones/cartera-acciones.component";
import { CompraAccionesComponent } from "./components/compra-acciones/compra-acciones.component";
import { VentaAccionesComponent } from "./components/venta-acciones/venta-acciones.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FinnhubService } from './services/FinnhubService/finnhub.service';
import { CarteraService } from './services/CarteraService/cartera.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarteraAccionesComponent,
    CompraAccionesComponent,
    VentaAccionesComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CarteraService, FinnhubService],
  bootstrap: [AppComponent],
})
export class AppModule {}
