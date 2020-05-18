import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FinnhubService {
  constructor(private http: HttpClient) {}

  APIkey: string = "bqmrtsnrh5re7283gh6g";
  baseURL: string = "https://finnhub.io/api/v1/quote";
  baseURLsymbol: string =
    "https://finnhub.io/api/v1/stock/symbol?exchange=MC&token=";
  symbol: string = "?symbol=";
  token: string = "&token=";

  public getCotizacion(simboloEmpresa: string): Observable<any> {
    let url =
      this.baseURL + this.symbol + simboloEmpresa + this.token + this.APIkey;
    return this.http.get<any>(url);
  }

  public getEmpresas(): Observable<any> {
    let url = this.baseURLsymbol + this.APIkey;
    return this.http.get<any>(url);
  }
}
