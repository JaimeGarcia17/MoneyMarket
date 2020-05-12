import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Cartera } from "src/app/models/cartera";
import { FinnhubService } from "src/app/services/FinnhubService/finnhub.service";
import { MatSnackBar } from '@angular/material';
import { CarteraService } from 'src/app/services/CarteraService/cartera.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-compra-acciones",
  templateUrl: "./compra-acciones.component.html",
  styleUrls: ["./compra-acciones.component.scss"],
})
export class CompraAccionesComponent implements OnInit {
  compra = new Cartera();
  precioActual = 0;
  precioApertura = 0;
  precioCierre = 0;
  precioMaximo = 0;
  precioMinimo = 0;
  importeTotal = 0;
  numeroAcciones = 0;

  formulario: FormGroup = new FormGroup({
    empresa: new FormControl(),
    simboloEmpresa: new FormControl(),
    fecha: new FormControl(),
    precioActual: new FormControl(),
    nAcciones: new FormControl(),
    importe: new FormControl(),
  });

  listaEmpresas: any;
  cotizacionSubscribe: any;

  constructor(private router: Router, private cartera:CarteraService,private finnhub: FinnhubService, private message:MatSnackBar) {}

  ngOnInit() {
    this.listaEmpresas = this.finnhub.listaEmpresas;
    console.log(this.listaEmpresas);
  }

  onSelect(element) {
    this.cotizacionSubscribe = this.finnhub.getCotizacion(element).subscribe(
      (data) => {
        this.precioActual = data.c;
        this.precioApertura = data.o;
        this.precioCierre = data.pc;
        this.precioMaximo = data.h;
        this.precioMinimo = data.l;
        this.importeTotal = this.numeroAcciones * this.precioActual;
        console.log(data)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  totalAcciones(acciones) {
    this.numeroAcciones = parseInt(acciones)
    this.importeTotal = acciones * this.precioActual;
  }

  comprarAcciones(){

    let simbolo = this.formulario.get("empresa").value;
    let fecha = this.formulario.get("fecha").value;

    if(simbolo != null && fecha != null && this.precioActual > 0 && this.numeroAcciones > 0 && this.importeTotal > 0){
      this.compra.simbolo = simbolo
      this.compra.fecha = fecha
      this.compra.precioUnitario = this.precioActual
      this.compra.cantidad = this.numeroAcciones
      this.compra.precioTotal = this.importeTotal
      this.cartera.createAccion(this.compra)
      this.message.open(
        "La compra de acciones se ha realizado correctamente",
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
