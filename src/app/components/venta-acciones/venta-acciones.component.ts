import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/services/CarteraService/cartera.service';
import { FinnhubService } from 'src/app/services/FinnhubService/finnhub.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-venta-acciones',
  templateUrl: './venta-acciones.component.html',
  styleUrls: ['./venta-acciones.component.scss']
})
export class VentaAccionesComponent implements OnInit {

  listaEmpresas: any;
  cotizacionSubscribe: any;
  precioSubscribe:any

  formulario: FormGroup = new FormGroup({
    idAccion: new FormControl(),
    fecha: new FormControl(),
  });

  numeroAcciones:number
  precioCompra:number
  precioActual:number
  precioVenta:number

  constructor(private router: Router, private cartera:CarteraService,private finnhub: FinnhubService, private message:MatSnackBar) { }

  ngOnInit() {
    this.cotizacionSubscribe = this.cartera.getCartera().subscribe(
      (data) => {
        this.listaEmpresas = data
      }
    )
  }

  onSelect(element) {
    this.numeroAcciones = element.cantidad
    this.precioCompra = element.precioUnitario
    this.precioSubscribe = this.finnhub.getCotizacion(element.simbolo).subscribe(
      (data) => {
        this.precioActual = data.c
        this.precioVenta = this.precioActual * this.numeroAcciones
      }
    )

  }

  venderAcciones(){

    let accion = this.formulario.get("idAccion").value;
    let fecha = this.formulario.get("fecha").value;


    if(accion.id != null && fecha != null && this.precioVenta > 0 ){
      this.cartera.deleteAccion(accion.id)
      this.message.open(
        "La venta de acciones de " +accion.simbolo +" se ha realizado correctamente",
        "Aceptar",
        { duration: 1000 })
      this.router.navigate(["cartera"]);
    }else{
      this.message.open(
        "Por favor, rellene todos los campos obligatorios",
        "Aceptar",
        { duration: 1000 })
    }

    
  }

  

}
