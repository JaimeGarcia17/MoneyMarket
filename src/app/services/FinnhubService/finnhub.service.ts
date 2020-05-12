import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  constructor(private http: HttpClient) { }

  APIkey:string = "bqmrtsnrh5re7283gh6g"
  baseURL:string = "https://finnhub.io/api/v1/quote"
  symbol:string = "?symbol="
  token:string = "&token="

  public getCotizacion(simboloEmpresa:string): Observable<any> {
    let url = this.baseURL + this.symbol + simboloEmpresa + this.token + this.APIkey
    return this.http.get<any>(url);
  }


  listaEmpresas:Empresa[] = [
    {nombreEmpresa:"A3Media", simbolo:"A3M.MC"},
    {nombreEmpresa:"ACS", simbolo:"ACS.MC"},
    {nombreEmpresa:"Adolfo Domínguez", simbolo:"ADZ.MC"},
    {nombreEmpresa:"AENA", simbolo:"AENA.MC"},
    {nombreEmpresa:"Airbus", simbolo:"AIR.MC"},
    {nombreEmpresa:"Amadeus", simbolo:"AMS.MC"},
    {nombreEmpresa:"Acciona", simbolo:"ANA.MC"},
    {nombreEmpresa:"BBVA", simbolo:"BBVA.MC"},
    {nombreEmpresa:"BANKIA", simbolo:"BKIA.MC"},
    {nombreEmpresa:"Bankinter", simbolo:"BKT.MC"},
    {nombreEmpresa:"CaixaBank", simbolo:"CABK.MC"},
    {nombreEmpresa:"Euskaltel", simbolo:"EKT.MC"},
    {nombreEmpresa:"Endesa", simbolo:"ELE.MC"},
    {nombreEmpresa:"Ferrovial", simbolo:"FER.MC"},
    {nombreEmpresa:"Iberdrola", simbolo:"IBE.MC"},
    {nombreEmpresa:"Indra", simbolo:"IDR.MC"},
    {nombreEmpresa:"Inditex", simbolo:"ITX.MC"},
    {nombreEmpresa:"Mapfre", simbolo:"MAP.MC"},
    {nombreEmpresa:"Melia Hotels", simbolo:"MEL.MC"},
    {nombreEmpresa:"OHL", simbolo:"OHL.MC"},
    {nombreEmpresa:"Prosegur", simbolo:"PSG.MC"},
    {nombreEmpresa:"Repsol", simbolo:"REP.MC"},
    {nombreEmpresa:"Banco Santander", simbolo:"SAN.MC"},
    {nombreEmpresa:"Sacyr", simbolo:"SCYR.MC"},
    {nombreEmpresa:"Telefonica", simbolo:"TEF.MC"},
    {nombreEmpresa:"Mediaset", simbolo:"TL5.MC"},
  ]


}
