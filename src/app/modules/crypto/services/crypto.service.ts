import { Injectable } from '@angular/core';
import { CoinsInterface } from '../interfaces/coins';
import { CoinInterface } from '../interfaces/coin';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const endpoint = 'https://api.coingecko.com/api/v3';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(
    private httpclient: HttpClient,
  ) {
  }

  getCoins(): Observable<HttpResponse<CoinsInterface[]>> {
    return this.httpclient.get<CoinsInterface[]>(`${endpoint}/coins/list`, {
      observe: 'response'});
  }

  getCoin(id: string): Observable<HttpResponse<CoinInterface>> {
    return this.httpclient.get<CoinInterface>(`${endpoint}/coins/${id}`, {
      observe: 'response'
    });
  }
}
