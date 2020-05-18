import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Cartera } from "src/app/models/cartera";
import { FinnhubService } from "src/app/services/FinnhubService/finnhub.service";
import { MatSnackBar } from "@angular/material";
import { CarteraService } from "src/app/services/CarteraService/cartera.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

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
  nombreEmpresa = "";
  simbolo = "";

  formulario: FormGroup = new FormGroup({
    empresa: new FormControl(),
    simboloEmpresa: new FormControl(),
    fecha: new FormControl(),
    precioActual: new FormControl(),
    nAcciones: new FormControl(),
    importe: new FormControl(),
  });

  listaEmpresas: any;
  listaSubscribe: Subscription;
  cotizacionSubscribe: Subscription;

  constructor(
    private router: Router,
    private cartera: CarteraService,
    private finnhub: FinnhubService,
    private message: MatSnackBar
  ) {}

  ngOnInit() {
    this.listaSubscribe = this.finnhub.getEmpresas().subscribe(
      (data) => {
        this.listaEmpresas = data;
      },
      (err) => {
        this.message.open(
          "No se ha podido recuperar tu cartera de acciones",
          "Aceptar",
          { duration: 1000 }
        );
        console.log(err);
      }
    );
  }

  onSelect(element) {
    this.cotizacionSubscribe = this.finnhub
      .getCotizacion(element.symbol)
      .subscribe(
        (data) => {
          this.precioActual = data.c;
          this.precioApertura = data.o;
          this.precioCierre = data.pc;
          this.precioMaximo = data.h;
          this.precioMinimo = data.l;
          this.importeTotal = this.numeroAcciones * this.precioActual;
          this.nombreEmpresa = element.description;
          this.simbolo = element.symbol;
        },
        (err) => {
          this.message.open(
            "No se ha podido recuperar la cotización",
            "Aceptar",
            { duration: 1000 }
          );
          console.log(err);
        }
      );
  }

  totalAcciones(acciones) {
    this.numeroAcciones = parseInt(acciones);
    this.importeTotal = acciones * this.precioActual;
  }

  comprarAcciones() {
    let fecha = this.formulario.get("fecha").value;

    if (
      this.simbolo != null &&
      fecha != null &&
      this.precioActual > 0 &&
      this.numeroAcciones > 0 &&
      this.importeTotal > 0
    ) {
      this.compra.simbolo = this.simbolo;
      this.compra.nombre = this.nombreEmpresa;
      this.compra.fecha = fecha;
      this.compra.precioUnitario = this.precioActual;
      this.compra.cantidad = this.numeroAcciones;
      this.compra.precioTotal = this.importeTotal;
      this.cartera.createAccion(this.compra);
      this.message.open(
        "La compra de acciones se ha realizado correctamente",
        "Aceptar",
        { duration: 1000 }
      );
      this.router.navigate(["cartera"]);
    } else {
      this.message.open(
        "Por favor, rellene adecuadamente todos los campos obligatorios",
        "Aceptar",
        { duration: 1000 }
      );
    }
  }

  ngOnDestroy() {
    this.listaSubscribe.unsubscribe();
    if (this.cotizacionSubscribe != null) {
      this.cotizacionSubscribe.unsubscribe();
    }
  }
}
