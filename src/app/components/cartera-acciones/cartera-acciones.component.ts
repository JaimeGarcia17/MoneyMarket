import { Component, OnInit, ViewChild } from "@angular/core";
import { Acciones } from "src/app/models/acciones";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSnackBar,
} from "@angular/material";
import { CarteraService } from "src/app/services/CarteraService/cartera.service";
import { FinnhubService } from "src/app/services/FinnhubService/finnhub.service";
import { timer, Subscription } from "rxjs";

@Component({
  selector: "app-cartera-acciones",
  templateUrl: "./cartera-acciones.component.html",
  styleUrls: ["./cartera-acciones.component.scss"],
})
export class CarteraAccionesComponent implements OnInit {
  dataSource = new MatTableDataSource();
  carteraSubscribe: Subscription;
  cotizacionSubscribe: Subscription;
  rentabilidadTotal: number = 0;
  listaAcciones: Acciones[] = [];
  listaPrecio: any[] = [];
  crono: Subscription;
  tiempoRefresco = 300000;
  fecha: number;

  displayedColumns: string[] = [
    "empresa",
    "numeroAcciones",
    "precioCompra",
    "precioActual",
    "rentabilidad",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private cartera: CarteraService,
    private finnhub: FinnhubService,
    private message: MatSnackBar
  ) {}

  ngOnInit() {
    this.crono = timer(0, this.tiempoRefresco).subscribe((e) => {
      this.rentabilidadTotal = 0;
      this.carteraSubscribe = this.cartera.getCartera().subscribe(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            this.listaAcciones[i] = new Acciones();
            this.cotizacionSubscribe = this.finnhub
              .getCotizacion(data[i].simbolo)
              .subscribe(
                (data) => {
                  this.listaAcciones[i].precioActual = +data.c.toFixed(2);
                  this.listaAcciones[i].rentabilidad = +(
                    this.listaAcciones[i].numeroAcciones *
                    (this.listaAcciones[i].precioActual -
                      this.listaAcciones[i].precioCompra)
                  ).toFixed(2);

                  this.rentabilidadTotal += +this.listaAcciones[
                    i
                  ].rentabilidad.toFixed(2);
                },
                (err) => {
                  this.message.open(
                    "Se ha excedido el límite de cuota, por favor prueba más tarde",
                    "Aceptar",
                    { duration: 3000 }
                  );
                  console.log(err);
                }
              );
            this.listaAcciones[i].empresa = data[i].nombre;
            this.listaAcciones[i].simboloEmpresa = data[i].simbolo;
            this.listaAcciones[i].fecha = data[i].fecha;
            this.listaAcciones[i].numeroAcciones = data[i].cantidad;
            this.listaAcciones[i].precioCompra = +data[i].precioUnitario;
          }
          this.dataSource.data = this.listaAcciones;
          this.fecha = Date.now();
        },

        (err) => {
          this.message.open(
            "No se ha podido recuperar tu cartera de acciones",
            "Aceptar",
            { duration: 3000 }
          );
          console.log(err);
        }
      );
      this.rentabilidadTotal = +this.rentabilidadTotal.toFixed(2);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  colorRentabilidad(value): boolean {
    if (value >= 0) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.carteraSubscribe.unsubscribe();
    this.cotizacionSubscribe.unsubscribe();
    this.crono.unsubscribe();
  }
}
