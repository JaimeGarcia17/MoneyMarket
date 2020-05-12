import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CarteraAccionesComponent } from './components/cartera-acciones/cartera-acciones.component';
import { CompraAccionesComponent } from './components/compra-acciones/compra-acciones.component';
import { VentaAccionesComponent } from './components/venta-acciones/venta-acciones.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent},
  { path: 'cartera', component: CarteraAccionesComponent},
  { path: 'comprar', component: CompraAccionesComponent},
  { path: 'vender', component: VentaAccionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
