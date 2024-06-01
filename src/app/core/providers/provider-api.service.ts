import { Injectable } from '@angular/core';
import { IAddressResponse } from '../../models/address-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderApiService {
  public baseUrl = environment.baseUrl;
  public providerPath = environment.providerPath;

  constructor(public http: HttpClient) { }


  public getCep(cep: string): Observable<IAddressResponse> {
    return this.http.get<IAddressResponse>(this.baseUrl + this.providerPath + `/cep/${cep}`);
  }
}
