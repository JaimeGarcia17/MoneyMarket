import { Component, OnInit, ViewChild } from "@angular/core";
import { Acciones } from "src/app/models/acciones";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatTable,
  MatSnackBar,
} from "@angular/material";
import { CarteraService } from "src/app/services/CarteraService/cartera.service";
import { FinnhubService } from "src/app/services/FinnhubService/finnhub.service";
import { Empresa } from "src/app/models/empresa";
import { timer } from 'rxjs';

const DATA: Acciones[] = [
  {
    empresa: "Repsol",
    simboloEmpresa: "REP.MC",
    numeroAcciones: 200,
    precioCompra: 13.5,
    precioActual: 15,
    rentabilidad: 1.5,
  },
];

@Component({
  selector: "app-cartera-acciones",
  templateUrl: "./cartera-acciones.component.html",
  styleUrls: ["./cartera-acciones.component.scss"],
})
export class CarteraAccionesComponent implements OnInit {

  dataSource = new MatTableDataSource();
  carteraSubscribe: any;
  cotizacionSubscribe: any;
  rentabilidadTotal:number = 0;
  listaAcciones: Acciones[] = [];
  listaPrecio: any[] = [];
  empresa = new Empresa();
  crono:any;
  tiempoRefresco = 600000
  fecha:number


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
    private message:MatSnackBar
  ) {}

  ngOnInit() {

    this.crono = timer(1000,this.tiempoRefresco).subscribe(
      (e) => {

      
      this.rentabilidadTotal = 0

      this.carteraSubscribe = this.cartera.getCartera().subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.listaAcciones[i] = new Acciones();
          this.empresa = this.finnhub.listaEmpresas.find(
            (x) => x.simbolo === data[i].simbolo
          );
          this.cotizacionSubscribe = this.finnhub
            .getCotizacion(data[i].simbolo)
            .subscribe((data) => {
              this.listaAcciones[i].precioActual = +data.c.toFixed(2);
              this.listaAcciones[i].rentabilidad =
                +(this.listaAcciones[i].numeroAcciones *
                (this.listaAcciones[i].precioActual -
                  this.listaAcciones[i].precioCompra)).toFixed(2);
                  
                  this.rentabilidadTotal += +this.listaAcciones[i].rentabilidad.toFixed(2);
            });
          this.listaAcciones[i].empresa = this.empresa.nombreEmpresa;
          this.listaAcciones[i].simboloEmpresa = this.empresa.simbolo;
          this.listaAcciones[i].numeroAcciones = data[i].cantidad;
          this.listaAcciones[i].precioCompra = +data[i].precioUnitario.toFixed(2);
        }
        this.dataSource.data = this.listaAcciones;
        this.fecha = Date.now()
      });
  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    }

    )
      
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
}
